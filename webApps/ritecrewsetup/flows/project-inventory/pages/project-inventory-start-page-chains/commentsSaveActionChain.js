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

  class commentsSaveActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

       let obj = {
        "p_eqp_request_id": $variables.selectionrow.equipment_request_id,
        "p_status": $variables.selectionrow.status,
        // "p_date": "NULL",
        "p_action":"COMMENTS UPDATE",
        "p_pagename": $application.currentPage.id,
        "p_comments": $variables.commentsobj.comments
      };
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
        body: obj,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Comments saved successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });

        const commentsClose2 = await Actions.callComponentMethod(context, {
          selector: '#comments',
          method: 'close',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Save Comments',
          type: 'error',
          displayMode: 'transient',
        });

        const commentsClose = await Actions.callComponentMethod(context, {
          selector: '#comments',
          method: 'close',
        });
        
      }

      await Actions.callChain(context, {
        chain: 'SearchBtnAction',
      });
      
    }
  }

  return commentsSaveActionChain;
});
