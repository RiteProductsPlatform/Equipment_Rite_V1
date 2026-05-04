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
        body: obj,
      });

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
    }
  }

  return FilePickerSelectChain;
});
