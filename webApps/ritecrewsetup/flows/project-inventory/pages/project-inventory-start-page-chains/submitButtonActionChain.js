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

  class submitButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('expense');

      if (validateGroup === "valid") {

        if ($variables.selectionrow.project_id) {

          const loadingDialogOpen = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });

          const saveProjectExpenseData = await $functions.saveProjectExpenseData($variables.projExpenseObj, $variables.selectionrow, $application.variables.user, $variables.israwCost);

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_ProjectMISCTransactions',
            body: saveProjectExpenseData,
          });

          if (response.ok) {

            $variables.projExpenseObj.originalTransactionReference = response.body.batch_name;

            const response4 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/getEQPRite_MISCTransactions',
              uriParams: {
                'p_business_unit': $variables.selectionrow.business_unit,
              },
            });

            const unprocessedCost = await $functions.unprocessedCost($variables.selectionrow, $variables.projExpenseObj, response.body.batch_name, response4.body.items[0]);

            const response3 = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05UnprocessedProjectCosts',
              body: unprocessedCost,
            });

            if (response3.ok) {
              let obj = {
                "p_oracle_unprocssed_ref": response3.body.UnprocessedTransactionReferenceId
              };
              const response5 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/putEQPRite_ProjectMISCTransactions',
                uriParams: {
                  'p_batch_name': response.body.batch_name,
                },
                body: obj,
              });
              const loadingDialogClose = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                type: 'confirmation',
                summary: 'Project Expense Transaction Created',
                displayMode: 'transient',
              });

            } else {
              const loadingDialogClose3 = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                summary: 'Failed To Create Project Expense',
                type: 'error',
                displayMode: 'transient',
                message: response3.body,
              });

            }
          } else {
            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Save Project Expense Details',
              type: 'error',
              displayMode: 'transient',
            });

          }
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Select The Record ',
            type: 'error',
            displayMode: 'transient',
          });

        }

      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Fill All Required Fields',
          type: 'error',
          displayMode: 'transient',
        });

      }
    }
  }

  return submitButtonActionChain;
});
