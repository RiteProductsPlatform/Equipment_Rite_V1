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
      const { $page, $flow, $application, $constants, $variables } = context;
      let obj = {
        "p_action": "NEED CLARIFICATION",
        "p_comments": $variables.infoObj.comments,
        "p_eqp_request_id": $variables.selectionrow.equipment_request_id,
        "p_pagename": "equip-approval-start",
        "p_status":"DRAFT"
      };

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
        body: obj,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Request Sent for Clarification',
          type: 'confirmation',
          displayMode: 'transient',
        });

        const infoClose = await Actions.callComponentMethod(context, {
          selector: '#info',
          method: 'close',
        });
        
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Sent Clarification',
          type: 'error',
          displayMode: 'transient',
        });

        const infoClose2 = await Actions.callComponentMethod(context, {
          selector: '#info',
          method: 'close',
        });
        
      }

      await Actions.callChain(context, {
        chain: 'SearchBtnAction',
      });
    }
  }

  return needinfoSaveButtonActionChain;
});
