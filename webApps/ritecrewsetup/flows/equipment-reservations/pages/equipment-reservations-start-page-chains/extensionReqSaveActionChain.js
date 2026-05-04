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

  class extensionReqSaveActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      try {

        let extensionReqPayload = {

          "p_comments": $variables.extensionReqObj.extComments,
          "p_date": $variables.extensionReqObj.extDate,
          "p_status": "EXTENSION REQUESTED",
          "p_action": "REQUEST EXTENSION",
          "p_eqp_request_id": $variables.selecedAcceptance.equipment_request_id,
          "p_pagename": $application.currentPage.id
        };

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
          headers: {
            'R_PAGE_NAME': 'equipment-reservations',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          body: extensionReqPayload,
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
            summary: 'Request Extended Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

          const extendRequestDialogClose = await Actions.callComponentMethod(context, {
            selector: '#extendRequestDialog',
            method: 'close',
          });

        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Extend the Request',
            displayMode: 'transient',
            type: 'error',
          });

          const extendRequestDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#extendRequestDialog',
            method: 'close',
          });

        }
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'equipment-reservations',
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
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

        const extendRequestDialogClose3 = await Actions.callComponentMethod(context, {
          selector: '#extendRequestDialog',
          method: 'close',
        });
      }
    }
  }

  return extensionReqSaveActionChain;
});
