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

  class DemobilizeApproveBtnAction extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let storeApiName;
let errMsg;
let pageName = 'equip-approval';

      try {
        
      storeApiName = 'putGetEqpRequestApproval';

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putGetEqpRequestApproval',
        body: {
          'equipment_request_id': $page.variables.selectionrow.equipment_request_id,
          'eqp_master_status': $variables.eqpstatus,
        },
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

      if (!response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Approve the Request',
          displayMode: 'transient',
        });
      
        return;
      } else {
        const approverejectDlgClose = await Actions.callComponentMethod(context, {
          selector: '#approverejectDlg',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Request Approved Successfully',
          displayMode: 'transient',
          type: 'confirmation',
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
      } 

    }
  }

  return DemobilizeApproveBtnAction;
});
