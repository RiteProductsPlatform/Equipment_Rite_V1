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

  class quoteAcceptButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      try {

 let obj = {
            "p_rental_reservation_number": $flow.variables.selectedReservationNumber

          };
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRent_CustAcceptance',
            headers: {
            'R_PAGE_NAME': 'equip-approval-quote3',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
            body: obj,
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

          if (response.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'The quote has been accepted successfully',
              type: 'confirmation',
              displayMode: 'transient',
              message: $flow.variables.selectedReservationNumber,
            });
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Accept Quote',
              displayMode: 'transient',
              type: 'error',
            });

          }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      } catch (error) {

        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
        const errorMessage = error?.message ||
    error?.body?.detail ||
    error?.body?.message||
      "Unknown API Error";

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equip-approval-quote3',
            'R_USER_NAME': $application.user.username,
          },
          body: {
         "p_api_name": 'postEQPRent_CustAcceptance',
         "p_debug_message": errorMessage
        },
        });
	  
	  await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });
      }

    }
  }

  return quoteAcceptButtonActionChain;
});
