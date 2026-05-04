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

  class SubmitClassSettingsAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      try {

        const validateGroup = await $application.functions.validateGroup('ClassSettings');

        if (validateGroup === 'valid') {

          const obj = {
            "p_equipment_class": $variables.ClassSettingsObj.eqpclass,
            "p_equipment_sub_class": $variables.ClassSettingsObj.eqpSubClass,
            "p_inspection_yard_check_out": $variables.ClassSettingsObj.inspcheckout,
            "p_inspection_site_check_in": $variables.ClassSettingsObj.inspsitecheckIn,
            "p_inspection_yard_check_in": $variables.ClassSettingsObj.inspcheckin,
            "p_attribute1": "",
            "p_attribute2": "",
            "p_attribute3": "",
            "p_attribute4": "",
            "p_attribute5": "",
            "p_created_by": $application.user.email,
            "p_last_updated_by": $application.user.email
          };

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_ClassSettings',
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
              summary: 'Settings Submitted Successfully',
              displayMode: 'transient',
              type: 'confirmation',
            });
          }

          // if (!response.ok) {
          //   await Actions.fireNotificationEvent(context, {
          //     summary: 'Failed to Submit Settings',
          //     displayMode: 'transient',
          //   });

          //   return;
          // } else {
          //   await Actions.fireNotificationEvent(context, {
          //     summary: 'Settings Submitted Successfully',
          //     displayMode: 'transient',
          //     type: 'confirmation',
          //   });
          // }
        }
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
            "p_api_name": 'postEQPRite_ClassSettings',
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

  return SubmitClassSettingsAction;
});
