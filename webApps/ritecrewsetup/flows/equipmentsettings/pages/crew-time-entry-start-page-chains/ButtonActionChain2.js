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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      try {

        const results = await ActionUtils.forEach($variables.eqpchecklistSaveADP.data, async (item, index) => {

          const savechecklistdata = await $functions.savechecklistdata(item, $application.user.fullName);

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPAdmin_ChecklistSearch',
            headers: {
              'R_PAGE_NAME': 'equipmentsettings',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
            body: savechecklistdata,
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
            $variables.insertStatus = true;
          }
        }, { mode: 'serial' });

        if ($variables.insertStatus) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Data Saved Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

          const eqpchecklistClose = await Actions.callComponentMethod(context, {
            selector: '#eqpchecklist',
            method: 'close',
          });

        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Save Data',
            displayMode: 'transient',
            type: 'error',
          });

        }

        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.eqpchecklistSaveADP,
        });
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
            "p_api_name": 'postEQPAdmin_ChecklistSearch',
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

  return ButtonActionChain2;
});
