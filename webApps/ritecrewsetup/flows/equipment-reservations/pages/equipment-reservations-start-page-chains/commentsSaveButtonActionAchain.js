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

  class commentsSaveButtonActionAchain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      
      try {

        let obj = {
          "p_eqp_request_id": $variables.selectionrow.equipment_request_id,
          "p_status": $variables.selectionrow.status,
          // "p_date": "NULL",
          "p_action":"COMMENTS UPDATE",
          "p_pagename": $application.currentPage.id,
          "p_comments": $variables.commentsDialogObj.comments
        };

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
          headers: {
            'R_PAGE_NAME': 'equipment-reservations',
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
            summary: 'Comments Saved Successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });

        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Save Comments',
            type: 'error',
            displayMode: 'transient',
          });

        }

        await Actions.resetVariables(context, {
          variables: [
    '$variables.commentsDialogObj',
  ],
        });

        const commentsDialogClose = await Actions.callComponentMethod(context, {
          selector: '#commentsDialog',
          method: 'close',
        });

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'equipment-reservations',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
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

        const commentsDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#commentsDialog',
          method: 'close',
        });
      }
    }
  }

  return commentsSaveButtonActionAchain;
});
