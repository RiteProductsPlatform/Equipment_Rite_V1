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

  class approveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      try {

        if ($variables.FilteredData && $variables.FilteredData.length > 0) {
          const loadingDialogOpen = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });

          const results = await ActionUtils.forEach($variables.FilteredData, async (item, index) => {
            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/putEqpSubmitTimeEntry',
              headers: {
                'R_PAGE_NAME': 'equipment-approver-screen',
                'R_TRACE_ID': $application.variables.traceIdDisplay,
                'R_USER_NAME': $application.user.username,
              },
              body: {
                "status": "APPROVED",
                "approved_flag": "Y",
                "batch_id": item.batch_id
              },
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
          }, { mode: 'serial' });

          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$variables.approverMainTableADP.data',
            ],
          });

          await Actions.callChain(context, {
            chain: 'SearchButtonActionChain_New',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Records approved successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });

        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Please select at least one timesheet row to approve',
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
            'R_PAGE_NAME': 'equipment-approver-screen',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": 'putOrdsTimeriteEQPRITETESTEqpSubmitTimeEntry',
            "p_debug_message": errorMessage
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });
      } finally {

        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

      }
    }
  }

  return approveButtonActionChain;
});
