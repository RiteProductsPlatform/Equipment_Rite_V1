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

  class needinfoSaveButtonActionChain extends ActionChain {

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
         let obj = {
        "p_action": "NEED CLARIFICATION",
        "p_comments": $variables.infoObj.comments,
        "p_eqp_request_id": $variables.selectionrow.equipment_request_id,
        "p_pagename": "equip-approval-start",
        "p_status": "DRAFT",
        "p_date": $functions.formatReservseDate,
        "p_file_name": null,
        "p_file_type": null,
        "p_file_content": null
      };

      storeApiName = 'postEQPRite_RequestUpdate';

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
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

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Request Sent for Clarification',
          type: 'confirmation',
          displayMode: 'transient',
        });

        await Actions.resetVariables(context, {
          variables: [
            '$variables.infoObj',
          ],
        });

        const infoClose = await Actions.callComponentMethod(context, {
          selector: '#info',
          method: 'close',
        });

      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Sent Clarification',
          type: 'error',
          displayMode: 'transient',
        });

        await Actions.resetVariables(context, {
          variables: [
            '$variables.infoObj',
          ],
        });

        const infoClose2 = await Actions.callComponentMethod(context, {
          selector: '#info',
          method: 'close',
        });

      }

      await Actions.callChain(context, {
        chain: 'SearchBtnAction',
      });

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

  return needinfoSaveButtonActionChain;
});
