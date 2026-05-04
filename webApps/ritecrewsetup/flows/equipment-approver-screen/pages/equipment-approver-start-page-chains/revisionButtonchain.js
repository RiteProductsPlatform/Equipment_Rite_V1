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

  class revisionButtonchain extends ActionChain {

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

      let FailedAPIName = '';

      try {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05ProjectCosts2',
          uriParams: {
            'q=UserExpenditureBatch': current.row.expenditure_batch,
          },
        });

        if (response.body.items.length >= 1) {

          FailedAPIName = 'postFscmRestApiResources11_13_18_05ProjectCostsTranscationNumberActionAdjustProjectCosts';

          const response2 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05ProjectCostsTranscationNumberActionAdjustProjectCosts',
            uriParams: {
              transcationNumber: response.body.items[0].TransactionNumber,
            },
            body: {
              AdjustmentType: 'REVERSE',
              Justification: 'Reverse due to incorrect entry',
            },
          });

          if (!response2.ok) {
            let errMsg =
              response2.body?.detail ||
              response2.body?.message ||
              (typeof response2.body === 'string' ? response2.body : null) ||
              response2.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }

          if (response2.ok) {
            const revisionpayload = await $functions.revisionpayload($variables.rowData, current.row);

              FailedAPIName = 'postFscmRestApiResources11_13_18_05UnprocessedProjectCosts';

            const response3 = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05UnprocessedProjectCosts',
              body: revisionpayload,
            });
            if (!response3.ok) {
              let errMsg =
                response3.body?.detail ||
                response3.body?.message ||
                (typeof response3.body === 'string' ? response3.body : null) ||
                response3.statusText ||
                'Unknown API Error';

              throw new Error(errMsg);
            }

            if (response3.ok) {
              await Actions.fireNotificationEvent(context, {
                type: 'confirmation',
                displayMode: 'transient',
                summary: 'Done',
              });
            } else {
              await Actions.fireNotificationEvent(context, {
                summary: 'Fail',
                type: 'error',
                displayMode: 'transient',
              });

            }

          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Adjust Project Cost',
              type: 'error',
              displayMode: 'transient',
              message: response2.body,
            });

          }
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Fetch Project Cost Details',
            type: 'error',
            displayMode: 'transient',
          });

        }
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response5 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-Approver-screen',
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": FailedAPIName,
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

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }
    }
  }

  return revisionButtonchain;
});
