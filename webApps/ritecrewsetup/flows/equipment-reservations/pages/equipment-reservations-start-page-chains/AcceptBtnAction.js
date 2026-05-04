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

  class AcceptBtnAction extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $variables, $functions, $application } = context;


      let FailedAPIName = '';

      try {
      

      // Show loader at start
      await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const initialUpdatePayload = {
        "equipment_request_id": $variables.selectionrow.equipment_request_id,
        "inspection_stage": 'Project - Check In',
        "eqp_master_status": "EQP PROJECT INSPECTION"
      };     

        FailedAPIName = 'postEQPInspectionApproval';

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
         headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-reservations',
            'R_USER_NAME': $application.user.username,
          },
       
        body: initialUpdatePayload,
      });
      if (!response.ok) {
           let errMsg =
              response.body?.detail ||
              response.body?.message ||
              (typeof response.body === 'string' ? response.body : null) ||
              response.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        }

      const response4 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getTransferOrder2',
        uriParams: {
          'equipment_name': $variables.selectionrow.equipment_name,
          'request_id': $variables.selectionrow.eqp_request_number,
        },
      });

      if (!response4.body || !response4.body.items || response4.body.items.length === 0) {
   return;
   }

const transferOrderNumber = response4.body.items[0].transfer_order_number;

      const response6 = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITESHIPMENTS1_0GetExpOrgsLov2',
        uriParams: {
          orderNumber: transferOrderNumber,
        },
      });


      let payload = {
          ReceiptSourceCode: 'TRANSFER ORDER',
          FromOrganizationCode: 'OAK_PPM',
          InsertAndProcessFlag: 'true',
          ShipmentNumber: response6.body.shipmentNumber,
          lines: [
            {
              ShipmentNumber: response6.body.shipmentNumber,
              ItemNumber: response6.body.itemNumber,
              Quantity: 1,
              DocumentLineNumber: 1,
              UnitOfMeasure: response6.body.uom,
            },
          ],
        };

        FailedAPIName = 'postFscmRestApiResources11_13_18_05ReceivingReceiptRequests2';
      const response3 = await Actions.callRest(context, {
        endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05ReceivingReceiptRequests2',
        body: payload,
      });
      if (!response3.ok) {
           let errMsg =
              response3.body?.detail ||
              response3.body?.message ||
              (typeof response3.body === 'string' ? response3.body : null) ||
              response3.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        } else {
              await Actions.fireNotificationEvent(context, {
           summary: 'Items Received Successfully.',
           type: 'confirmation',
              });
        }



      if (!response.ok) {
        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });



        await Actions.fireNotificationEvent(context, {
          summary: 'Initial status update failed',
          displayMode: 'transient',
          type: 'error',
        });

        return;
      } else {

        let obj = {
            Message: "FYI- Request No."+ $variables.selectionrow.eqp_request_number+"  has been Accepted by. "  + $application.variables.user,
            TaskCreator: $application.variables.user,
            'Role_Name': 'OII Equipment Timekeeper',
          };

          FailedAPIName = 'postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report';
        const response2 = await Actions.callRest(context, {
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-reservations',
            'R_USER_NAME': $application.user.username,
          },
          endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',
          body: obj,
        });
                if (!response2.ok) {
           let errMsg =
              response2.body?.detail ||
              response2.body?.message ||
              (typeof response2.body === 'string' ? response2.body : null) ||
              response2.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        }

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Accepted Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }
    } catch (error) {
      const errorMessage = error?.message ||
    error?.body?.detail ||
    error?.body?.message||
      "Unknown API Error";

        const response5 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-reservations',
            'R_USER_NAME': $application.user.username,
          },
          body: {
         "p_api_name": FailedAPIName,
         "p_debug_message": errorMessage
        },
        });
	  
	  await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });
      } finally {

        await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
                });
      }
  
    }
  }

  return AcceptBtnAction;
});
