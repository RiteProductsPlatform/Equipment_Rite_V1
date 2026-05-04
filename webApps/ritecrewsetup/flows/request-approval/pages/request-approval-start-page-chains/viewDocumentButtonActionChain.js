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

  class viewDocumentButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/EQPRite_GetRequestIDDetails',
        uriParams: {
          'p_pagename': 'equip-approval-start',
          'p_action': 'GET ATTACHMENT',
          'p_equipment_request_id': $variables.selectionrow.equipment_request_id,
        },
      });

      if (response.body.items[0].file_content) {


        await $functions.downloadBase64File(response.body.items[0].file_content, $variables.selectionrow.file_name);
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'No file is attached for the selected record',
          type: 'info',
          displayMode: 'transient',
        });

      }

      const attachPopupClose = await Actions.callComponentMethod(context, {
        selector: '#AttachPopup',
        method: 'close',
      });
    }
  }

  return viewDocumentButtonActionChain;
});
