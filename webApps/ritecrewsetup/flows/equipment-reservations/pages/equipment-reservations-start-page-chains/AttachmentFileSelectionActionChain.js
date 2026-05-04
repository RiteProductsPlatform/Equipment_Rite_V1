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

  class AttachmentFileSelectionActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object[]} params.files
     * @param {any} params.originalEvent
     */
    async run(context, { event, files, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
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

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
          headers: {
            'R_PAGE_NAME': 'equip-approval',
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
            summary: 'Your file has been Attached Successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });

          const attachPopupClose = await Actions.callComponentMethod(context, {
            selector: '#AttachPopup',
            method: 'close',
          });
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Attach File',
            type: 'error',
            displayMode: 'transient',
          });

          const attachPopupClose2 = await Actions.callComponentMethod(context, {
            selector: '#AttachPopup',
            method: 'close',
          });
          
        }

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });
      } catch (error) {
        const errorMessage = error?.message ||
    error?.body?.detail ||
    error?.body?.message||
      "Unknown API Error";

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-reservations',
            'R_USER_NAME': $application.user.username,
          },
          body: {
         "p_api_name": 'postEQPRite_RequestUpdate',
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

  return AttachmentFileSelectionActionChain;
});
