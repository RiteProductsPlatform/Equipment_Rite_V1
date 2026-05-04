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

  class RejectActionChain_EXTREQ extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let payload={
        "p_pagename" : $application.currentPage.id
      }

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
        body: payload,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Extension Request Rejected Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Reject Extension Request',
          displayMode: 'transient',
          type: 'error',
        });
        
      }

    }
  }

  return RejectActionChain_EXTREQ;
});
