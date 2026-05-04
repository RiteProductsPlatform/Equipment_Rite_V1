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

  class submitActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      try {

        const validateGroup = await $application.functions.validateGroup('misc');
        if (validateGroup === "valid") {
          const saveMiscData = await $functions.saveMiscData($variables.miscObj, $application.variables.user);

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_MISCTransactions',
            headers: {
              'R_PAGE_NAME': 'equipmentsettings',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
            body: saveMiscData,
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
              summary: 'Your Miscellaneous transaction settings  have been saved successfully.',
              type: 'confirmation',
              displayMode: 'transient',
            });
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Save Miscellaneous transactions ',
              type: 'error',
              displayMode: 'transient',
            });

          }
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Please ensure that all required fields are selected before submitting.',
            type: 'error',
            displayMode: 'transient',
          });

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
            "p_api_name": 'postEQPRite_MISCTransactions',
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

  return submitActionChain;
});
