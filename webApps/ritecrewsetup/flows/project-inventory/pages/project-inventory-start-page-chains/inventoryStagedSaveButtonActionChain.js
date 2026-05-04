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

  class inventoryStagedSaveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('inventoryvalidation');

      if (validateGroup==="valid") {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });
        const postinventoryStagedTransactions = await $functions.postinventoryStagedTransactions($variables.inventoryStagedTransactions, $variables.selectionrow);

        const response = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/post11_13_18_05InventoryStagedTransactions',
          body: postinventoryStagedTransactions,
        });

        if (response.ok && response.body && !response.body.ErrorExplanation) {

          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            type: 'confirmation',
            displayMode: 'transient',
            message: 'Inter-Organization Transfer Completed Successfully',
            summary: "ShipmentNumber: "+response.body.ShipmentNumber,
          });
          const inventoryStagedClose = await Actions.callComponentMethod(context, {
            selector: '#inventoryStaged',
            method: 'close',
          });

          await Actions.resetVariables(context, {
            variables: [
    '$variables.inventoryStagedTransactions',
  ],
          });

        }else{
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: response.body.ErrorExplanation,
            type: 'error',
            displayMode: 'transient',
            message: 'Inter-Organization Transfer Could Not Be Completed',
          });
          
        }

      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please complete all required fields to proceed',
          type: 'error',
          displayMode: 'transient',
        });

        const loadingDialogClose3 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
        
      }
    }
  }

  return inventoryStagedSaveButtonActionChain;
});
