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

  class draftDialogSaveActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      

      try {

        const saveDraft = await $functions.saveDraft($variables.draftobj, $variables.selectionrow, $application.currentPage.id, $application.variables.user);

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEQPRite_RequestEdit',
          headers: {
            'R_PAGE_NAME': 'equipment-reservations',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          uriParams: {
            'p_equipment_request_id': $variables.selectionrow.equipment_request_id,
          },
          body: saveDraft,
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
            type: 'confirmation',
            summary: 'Request Updated Successfully',
            displayMode: 'transient',
          });

          const editDialogClose = await Actions.callComponentMethod(context, {
            selector: '#editDialog',
            method: 'close',
          });
          
        }else{

          await Actions.fireNotificationEvent(context, {
            type: 'error',
            displayMode: 'transient',
            summary: 'Failed To Update Request',
          });
          const editDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#editDialog',
            method: 'close',
          });
          
        }
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
           headers: {
            'R_PAGE_NAME': 'equipment-reservations',
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": 'putOrdsTimeriteEQPRITETESTEQPRite_RequestEdit',
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

  return draftDialogSaveActionChain;
});
