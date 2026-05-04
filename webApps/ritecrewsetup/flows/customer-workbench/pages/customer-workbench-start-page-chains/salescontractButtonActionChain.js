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

  class salescontractButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      let FailedAPIName = '';

      try {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });
        const currentTimestamp = await $functions.getCurrentTimestamp();

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getQuoteDetails2',
          uriParams: {
            'p_res_number': $variables.currentRow.rowData.rental_reservation_number,
          },
        });
        const calculateDaysBetweenUSFormat = await $functions.calculateDaysBetweenUSFormat($variables.currentRow.rowData.start_date, $variables.currentRow.rowData.end_date);
        const createRentalContract = await $functions.createRentalContract($variables.currentRow.rowData, response.body.items, "CB-Sell" + "-" + currentTimestamp, calculateDaysBetweenUSFormat + 1);

        FailedAPIName = 'postContracts';
        
        const response2 = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/postContracts',
          body: createRentalContract,
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
        if (response2.ok) {

          const updateRentalContract = await $functions.updateRentalContract(response2.body.ContractId, response2.body.ContractLine);
          FailedAPIName = 'patchContractsContractId';
          const response4 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/patchContractsContractId',
            uriParams: {
              ContractId: response2.body.ContractId,
            },
            body: updateRentalContract,
          });
          if (response4.ok) {

            let obj = {
              "p_contract_number": response2.body.ContractNumber,
              "p_rental_reservation_number": $variables.currentRow.rowData.rental_reservation_number
            };

            FailedAPIName = 'postGetManagerQuoteDetails';

            const response5 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postGetManagerQuoteDetails',
              headers: {
                'R_TRACE_ID': $application.variables.traceIdDisplay,
                'R_PAGE_NAME': 'Customer-Request-Workbench',
                'R_USER_NAME': $application.user.username,
              },
              body: obj,
            });
            if (!response5.ok) {

              let errMsg =
                response5.body?.detail ||
                response5.body?.message ||
                (typeof response5.body === 'string' ? response5.body : null) ||
                response5.statusText ||
                'Unknon API Error';

              throw new Error(errMsg);
            }

            if (response5.ok) {

              await Actions.fireNotificationEvent(context, {
                summary: 'Rental Contract Created',
                type: 'confirmation',
                displayMode: 'persist',
                message: response2.body.ContractNumber,
              });

              const actionpopupClose = await Actions.callComponentMethod(context, {
                selector: '#actionpopup',
                method: 'close',
              });

              await Actions.callChain(context, {
                chain: 'SearchButtonActionChain',
              });
            } else {
              await Actions.fireNotificationEvent(context, {
                summary: 'Failed To  Create Rental Contract',
                type: 'error',
                displayMode: 'transient',
              });

            }
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Create  Rental Contract',
              type: 'error',
              displayMode: 'transient',
            });

          }
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Create Rental Contract',
            type: 'error',
            displayMode: 'transient',
          });

        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response6 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'Customer-Request-Workbench',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
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
      } finally{
        

        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }
    }
  }

  return salescontractButtonActionChain;
});
