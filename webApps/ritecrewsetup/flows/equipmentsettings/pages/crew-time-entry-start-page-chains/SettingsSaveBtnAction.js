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

  class SettingsSaveBtnAction extends ActionChain {

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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      try {

        // debugger;
        const updatesettings = await $functions.updatesettings(current.row);

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEqpSettings',
          headers: {
            'R_PAGE_NAME': 'equipmentsettings',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          uriParams: {
            'p_id': updatesettings.p_id,
          },
          body: updatesettings,
        });
        if (!response.ok) {
          let errMsg =
            response.body?.detail ||
            response.body?.message ||
            (typeof response.body === 'string' ? response.body : null) ||
            response.statusText ||
            'Unknown API Error';

          throw new Error(errMsg);
        } else {
           await Actions.fireNotificationEvent(context, {
             summary: 'Record Updated Successfully',
             displayMode: 'transient',
             type: 'confirmation',
           });
        }

        // if (!response.ok) {
        //   await Actions.fireNotificationEvent(context, {
        //     summary: 'Failed to Update Record',
        //     displayMode: 'transient',
        //   });

        //   return;
        // } else {
        //   await Actions.fireNotificationEvent(context, {
        //     summary: 'Record Updated Successfully',
        //     displayMode: 'transient',
        //     type: 'confirmation',
        //   });

        // }
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'equipmentsettings',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": 'putEqpSettings',
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

  return SettingsSaveBtnAction;
});
