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

  class ApproveActionChain_EXTREQ extends ActionChain {

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

      let storeApiName;

let errMsg;

let pageName = 'equip-approval';

      try {
          let payload ={
    "p_pagename":$application.currentPage.id,
    "p_action" : 'REQUEST EXTENSION',
    "p_status":current.row.status,
    "p_eqp_request_id":current.row.equipment_request_id
   
   };
        storeApiName = 'postEQPRite_RequestUpdate';
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
        body: payload,
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
          summary: 'Request Approved Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Approve Request',
          displayMode: 'transient',
          type: 'error',
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

  return ApproveActionChain_EXTREQ;
});
