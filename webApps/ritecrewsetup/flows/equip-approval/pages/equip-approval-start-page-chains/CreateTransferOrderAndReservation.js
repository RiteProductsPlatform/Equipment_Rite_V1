define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class CreateTransferOrderAndReservation extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.requestNumber
     * @param {string} params.equipmentName
     */
    async run(context, { requestNumber, equipmentName }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // Step 0: Get inventory item number from ORDS using equipment name
      let itemNumber = null;

      const results = await ActionUtils.forEach($variables.eqpnums, async (item, index) => {

        if (item.inventory_item) {
          itemNumber = item.inventory_item;

          // Generate batch number: OAK_CIANBRO_YYYYMMDDHHMMSS
          const now = new Date();
          const pad = (n, len = 2) => String(n).padStart(len, '0');
          const timestamp = now.getFullYear().toString()
            + pad(now.getMonth() + 1)
            + pad(now.getDate())
            + pad(now.getHours())
            + pad(now.getMinutes())
            + pad(now.getSeconds());
          const batchNumber = 'EQP' + timestamp;

          // Step 1: Create Supply Request
          const payload = {
            InterfaceSourceCode: 'EXT',
            InterfaceBatchNumber: batchNumber,
            SupplyRequestStatus: 'NEW',
            SupplyRequestDate: now.toISOString(),
            SupplyOrderSource: 'EXT',
            SupplyOrderReferenceNumber: batchNumber,
            SupplyOrderReferenceId: 700,
            ProcessRequestFlag: 'Y',
            supplyRequestLines: [
              {
                InterfaceBatchNumber: batchNumber,
                InterfaceSourceCode: 'EXT',
                SupplyOrderSource: 'EXT',
                SupplyOrderReferenceLineNumber: '1',
                SupplyOrderReferenceLineId: 700,
                SourceOrganizationCode: 'OAK_PPM',
                DestinationOrganizationCode: 'OAK_PROJECT_SITES',
                ItemNumber: itemNumber,
                BackToBackFlag: 'N',
                NeedByDate: '2026-04-05T23:59:59.000+00:00',
                Quantity: 1,
                UOMCode: 'zzu',
                PreparerId: 300000307046815,
                DeliverToRequesterId: 300000307046815,
                SupplyType: 'TRANSFER',
                SupplyOperation: 'CREATE',
                DestinationTypeCode: 'INVENTORY'
              }
            ]
          };

          let response;
          try {
            response = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05SupplyRequests',
              body: payload
            });
          } catch (error) {
            console.error('Supply Request creation failed:', error);
            await Actions.fireNotificationEvent(context, {
              summary: 'Error',
              message: 'Supply Request creation failed: ' + (error.message || JSON.stringify(error)),
              type: 'error'
            });
            return;
          }

          if (!response.ok) {
            const detail = response.body ? JSON.stringify(response.body) : response.status;
            console.error('Supply Request failed:', detail);
            await Actions.fireNotificationEvent(context, {
              summary: 'Error',
              message: 'Supply Request failed (' + response.status + '): ' + detail,
              type: 'error'
            });
            return;
          }

          // Step 2: Poll OIC endpoint every 10 seconds, max 18 attempts (3 minutes total)
          const MAX_ATTEMPTS = 18;
          const POLL_INTERVAL_MS = 10000;
          let transferOrderNumber = null;
           console.log('Supply Request created. Batch:', batchNumber, 'Response:', response.body);

      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        console.log('Polling for Transfer Order... Attempt ' + attempt + '/' + MAX_ATTEMPTS);

        try {
          const toResponse = await Actions.callRest(context, {
            endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITETRANSFERORDERS1_0GetExpOrgsLov',
            uriParams: {
              refNumber: batchNumber
            }
          });

          if (toResponse.ok && toResponse.body && toResponse.body.TransferOrderNumber) {
            transferOrderNumber = toResponse.body.TransferOrderNumber;
            console.log('Transfer Order Number found:', transferOrderNumber, 'on attempt', attempt);
            break;
          }

          console.log('Attempt ' + attempt + ': Transfer Order not ready yet.');
        } catch (error) {
          console.warn('Attempt ' + attempt + ': Poll failed:', error.message || error);
        }

        if (attempt < MAX_ATTEMPTS) {
          await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
        }
      }

      if (!transferOrderNumber) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: 'Supply Request created (' + batchNumber + ') but Transfer Order was not generated within 3 minutes. Please check manually.',
          type: 'error'
        });
        return;
      }

      // Step 3: Create Inventory Reservation using the TransferOrderNumber
      const reservationPayload = {
        ItemNumber: itemNumber,
        OrganizationId: 300001690872060,
        DemandSourceType: 'Transfer order',
        DemandSourceHeaderNumber: transferOrderNumber,
        DemandSourceLineNumber: '1',
        SupplySourceType: 'On hand',
        SubinventoryCode: 'COM_SUBINV',
        ReservationUnitOfMeasure: 'Ea',
        ReservationQuantity: 1
      };

      let reservationResponse;
      try {
        reservationResponse = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05InventoryReservations',
          body: reservationPayload,
        });
      } catch (error) {
        console.error('Inventory Reservation failed:', error);
        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: 'Transfer Order ' + transferOrderNumber + ' created but Reservation failed: ' + (error.message || JSON.stringify(error)),
          type: 'error'
        });
        return;
      }

      if (!reservationResponse.ok) {
        const detail = reservationResponse.body ? JSON.stringify(reservationResponse.body) : reservationResponse.status;
        console.error('Inventory Reservation failed:', detail);
        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: 'Transfer Order ' + transferOrderNumber + ' created but Reservation failed (' + reservationResponse.status + '): ' + detail,
          type: 'error'
        });
        return;
      }

      const reservationId = reservationResponse.body.ReservationId;
      console.log('Reservation ID:', reservationId, '| Transfer Order:', transferOrderNumber, '| Batch:', batchNumber);

      // Step 4: Store transfer order details in ORDS
      const ordsPayload = {
        request_number: requestNumber,
        transfer_order_number: transferOrderNumber,
        equipment_name: equipmentName,
        item_number: itemNumber
      };

      try {
        const ordsResponse = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postTransferOrder',
          body: ordsPayload,
        });

        if (ordsResponse.ok) {
          console.log('Transfer Order details saved to ORDS:', ordsPayload);
        } else {
          console.error('ORDS save failed:', ordsResponse.status, JSON.stringify(ordsResponse.body));
          await Actions.fireNotificationEvent(context, {
            summary: 'Warning',
            message: 'Transfer Order ' + transferOrderNumber + ' created and reserved, but failed to save details to ORDS.',
            type: 'warning'
          });
        }
      } catch (error) {
        console.error('ORDS save failed:', error);
        await Actions.fireNotificationEvent(context, {
          summary: 'Warning',
          message: 'Transfer Order ' + transferOrderNumber + ' created and reserved, but failed to save details to ORDS.',
          type: 'warning'
        });
      }
        }
      }, { mode: 'serial' });
      // try {
      //   const itemResponse = await Actions.callRest(context, {
      //     endpoint: 'TimeRite_Ords_Service/getGetItemNumber',
      //     uriParams: {
      //       equipment_name: equipmentName
      //     }
      //   });

      //   if (itemResponse.ok && itemResponse.body && itemResponse.body.items && itemResponse.body.items.length > 0) {
      //     itemNumber = itemResponse.body.items[0].inventory_item;
      //     console.log('Item Number resolved:', itemNumber, 'for equipment:', equipmentName);
      //   }
      // } catch (error) {
      //   console.error('Get Item Number failed:', error);
      // }

      // if (!itemNumber) {
      //   await Actions.fireNotificationEvent(context, {
      //     summary: 'Error',
      //     message: 'Could not resolve Item Number for equipment: ' + equipmentName,
      //     type: 'error'
      //   });
      //   return;
      // }

     
    }
  }

  return CreateTransferOrderAndReservation;
});