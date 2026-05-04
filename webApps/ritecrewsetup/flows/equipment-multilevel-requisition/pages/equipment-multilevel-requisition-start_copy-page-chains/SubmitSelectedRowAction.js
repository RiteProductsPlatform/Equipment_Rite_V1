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

  class SubmitSelectedRowAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let storeApiName;
let errMsg;
let pageName = 'Create Request Cart';
     
      try {

              const validateGroup = await $application.functions.validateGroup('requestvalgroup');

      if (validateGroup === 'valid') {

        storeApiName = 'postEQPRite_ReqHeaderSubmit';

        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_ReqHeaderSubmit',
          body: {},
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
        });

        if (!response3.ok) {
 
   errMsg =
    response3.body?.detail ||
    response3.body?.message ||
    (typeof response3.body === 'string' ? response3.body : null) ||
    response3.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}
 
 

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/TR_EQP_MAXCartNumber',
        });
        let eqp_request_number;

        if (response3.ok) {
          eqp_request_number = response3.body.eqp_request_number;
        }
        let isSaved = true;
        let cartRequest = null;
        let requestNumber = 0;
        if (eqp_request_number) {
          const results = await ActionUtils.forEach($variables.CartArray, async (item, index) => {

            const loadingDialogOpen = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'open',
            });

            const formatDate = await $functions.formatDate($variables.selectedRowRequest.start_date);
            const formatDate2 = await $functions.formatDate($variables.selectedRowRequest.end_date);
            const cartPayloadgenerator = await $functions.cartPayloadgenerator(eqp_request_number, $variables.selectedRowRequest, $variables.CartArray[index], $variables.CartArray.length, response2.body.items[0].equipment_cart_number, formatDate, formatDate2, $application.variables.user, $variables.softReservation, $variables.invLocationObj);



            storeApiName = 'postEQPRite_RequestCartSubmit';

            const response4 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestCartSubmit',
              body: cartPayloadgenerator,
              headers: {
                'R_PAGE_NAME': pageName,
                'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                'R_USER_NAME': $application.user.username,
              },
            });
            if (!response4.ok) {
 
  errMsg =
    response4.body?.detail ||
    response4.body?.message ||
    (typeof response4.body === 'string' ? response4.body : null) ||
    response4.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}
 
 

            if (!response4.ok) {
              isSaved = false;

            } else {
              requestNumber = response4.body.eqp_request_number;
            }



          }, { mode: 'serial' });
          if (isSaved) {
            await Actions.fireNotificationEvent(context, {
              summary: "Equipment Request: " + eqp_request_number + " submitted Successfully",
              displayMode: 'transient',
              type: 'confirmation',
            });

            $variables.iscart = false;

            await Actions.resetVariables(context, {
              variables: [
    '$page.variables.CartArray',
    '$variables.equipmentADP.data',
    '$variables.searchObj',
    '$variables.searchVar',
  ],
            });

            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });
          }
          else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to Submit Equipment Details',
              displayMode: 'transient',
              type: 'error',
            });

            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            return;
          }
        }




        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.selectedRowRequest',
            '$page.variables.EqpMasterWorkOrderADP.data',
          ],
        });

        const submitRequestDlgClose = await Actions.callComponentMethod(context, {
          selector: '#submitRequestDlg',
          method: 'close',
        });
      }
      } catch (error) {
        let errMessage =
  error?.message ||
  error?.body?.detail ||
  error?.body?.message ||
  (typeof error?.body === 'string' ? error.body : null) ||
  JSON.stringify(error);

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
                'p_api_name': storeApiName,
                'p_debug_message':errMessage
        },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'ERROR',
          message: errMessage,
          displayMode: 'persist',
          type: 'error',
        });

      } finally {
                const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }


    }
  }

  return SubmitSelectedRowAction;
});
