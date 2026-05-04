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

  class inventorySaveButtonActionChain extends ActionChain {

    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let api_name = "post11_13_18_05InventoryStagedTransactions";
      let page_name = "Project Inventory Transactions";

      try {

        const validateGroup =
          await $application.functions.validateGroup('inventoryValid');

        if (validateGroup === "valid") {

          if ($variables.selectionrow.project_id) {

            const postinventory =
              await $functions.postinventory(
                $variables.inventoryObj,
                $variables.selectionrow
              );

            const response = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/post11_13_18_05InventoryStagedTransactions',

              headers: {
                R_TRACE_ID: $application.variables.traceIdDisplay,
                R_USER_NAME: $application.user.username,
                R_PAGE_NAME: page_name
              },

              body: postinventory,
            });

            if (!response.ok) {

              let errMsg =
                response.body?.detail ||
                response.body?.message ||
                (typeof response.body === 'string'
                  ? response.body
                  : null) ||
                response.statusText ||
                'Unknown API Error';

              throw new Error(errMsg);
            }

            await Actions.fireNotificationEvent(context, {
              summary: 'Inventory Transaction Created',
              type: 'confirmation',
              displayMode: 'transient',
            });

            await Actions.resetVariables(context, {
              variables: [
                '$variables.inventoryObj',
              ],
            });

          } else {

            await Actions.fireNotificationEvent(context, {
              summary: 'Please select record',
              type: 'error',
              displayMode: 'transient',
            });

            return;
          }

        } else {

          await Actions.fireNotificationEvent(context, {
            summary: 'Please fill required fields',
            type: 'error',
            displayMode: 'transient',
          });

          return;
        }

      }

      catch (error) {

        const errorMessage =
          error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',

          headers: {
            R_TRACE_ID: $application.variables.traceIdDisplay || null,
            R_USER_NAME: $application.user.username,
            R_PAGE_NAME: page_name
          },

          body: {
            p_api_name: api_name,
            p_debug_message: errorMessage
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });

        return;
      }
    }
  }

  return inventorySaveButtonActionChain;
});