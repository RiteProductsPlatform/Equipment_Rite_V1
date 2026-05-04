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

  class demobilizeSaveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let storeApiName;
let errMsg;
let pageName = 'equip-approval';

      try {
              if ($variables.demobObj.date) {
        let obj = {
          "p_disband_approved_comments": $variables.demobObj.comments,
          "p_disband_approved_date": $functions.formatDate($variables.demobObj.date),
          "p_disband_request_date": $functions.formatDate($variables.demobObj.date)
        };
        storeApiName = 'putEQPRite_EqpManagerApproval';

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEQPRite_EqpManagerApproval',
          uriParams: {
            'p_equipment_request_id': $variables.selectionrow.equipment_request_id,
          },
          body: obj,
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
        });
if (!response.ok)
{
errMsg =response.body?.detail ||response.body?.message ||(typeof response.body === 'string' ? response.body : null) ||response.statusText ||'API Error';
throw new Error(errMsg);
}


        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Demobilization request has been initiated successfully.',
            type: 'confirmation',
            displayMode: 'transient',
          });

          await Actions.callChain(context, {
            chain: 'DemobilizeDialogCloseButtonActionChain',
          });

        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Intiate Demobilization Request',
            message: 'Please contact the System Administrator for assistance.',
            displayMode: 'transient',
            type: 'error',
          });

        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Date',
          type: 'error',
          displayMode: 'transient',
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

  return demobilizeSaveButtonActionChain;
});
