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

  class ClassSettingsSaveBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      
      try {

   let obj = {
          "p_class_settings_id": current.row.class_settings_id,
          "p_equipment_class": current.row.equipment_class,
          "p_equipment_sub_class": current.row.equipment_sub_class,
          "p_inspection_site_check_in": current.row.inspection_site_check_in,
          "p_inspection_yard_check_in": current.row.inspection_yard_check_in,
          "p_inspection_yard_check_out": current.row.inspection_yard_check_out,

        };

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEQPRite_ClassSettings',
          headers: {
            'R_PAGE_NAME': 'equipmentsettings',
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
        else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Settings Saved Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });
        }
        // if (!response.ok) {
        //   await Actions.fireNotificationEvent(context, {
        //     summary: 'Failed to Save Settings',
        //     displayMode: 'transient',
        //   });

        //   return;
        // } else {
        //   await Actions.fireNotificationEvent(context, {
        //     summary: 'Settings Saved Successfully',
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
            "p_api_name": 'putEQPRite_ClassSettings',
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

  return ClassSettingsSaveBtnAction;
});
