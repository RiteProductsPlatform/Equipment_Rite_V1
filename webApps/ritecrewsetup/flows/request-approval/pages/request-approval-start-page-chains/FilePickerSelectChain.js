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

  class FilePickerSelectChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object[]} params.files
     * @param {any} params.originalEvent
     */
    async run(context, { event, files, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let storeApiName;
let errMsg;
let pageName = 'request-approval-start';

      try {
         const converImageBase64 = await $functions.converImageBase64(files[0]);

       let obj={
        "p_eqp_request_id":$variables.selectionrow.equipment_request_id,
        "p_status":$variables.selectionrow.status,
        "p_pagename":$application.currentPage.id,
        "p_file_name":files[0].name,
        "p_file_type":files[0].type,
        "p_action":"ATTACHMENT UPDATE",
        "p_file_content":converImageBase64.data
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
          summary: 'Your file has been Attached Successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });
        
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Attach File',
          type: 'error',
          displayMode: 'transient',
        });

      }

      const attachPopupClose = await Actions.callComponentMethod(context, {
        selector: '#attachPopup',
        method: 'close',
      });

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

  return FilePickerSelectChain;
});
