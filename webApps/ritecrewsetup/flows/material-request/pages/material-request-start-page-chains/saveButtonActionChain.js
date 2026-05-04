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

  class SaveButtonActionChain extends ActionChain {
    async run(context) {
      const { $variables, $functions } = context;
      let insertSuccess = true;

      const dataList = $variables.FTOdlgADP.data;

      for (let i = 0; i < dataList.length; i++) {
        const item = dataList[i];

        const payload = {
          p_project_id: item.project_id,
          p_project_number: item.project_number,
          p_project_name: item.project_name,
          p_task_id: item.task_id,
          p_task_number: item.task_number,
          p_task_name: item.task_name,
          p_item_number: null,
          p_item_description: item.item_description,
          p_quantity: item.quantity,
          p_uom: item.uom,
          p_po_number: item.po_number,
          p_supplier: item.supplier,
          p_workorder_number: item.workorder_number,
          p_comments: item.comments
        };

        const payloadgen = await $functions.createpayloadGenerator(item);

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_MaterialProject',
          body: payload,
        });

        if (!response.ok) {
          insertSuccess = false;

          await Actions.fireNotificationEvent(context, {
            displayMode: 'transient',
            summary: { type: 'error', summary: 'Failed To Save Material Request' },
          });

          // Exit early on failure
          return;
        } else {
          await Actions.callRest(context, {
            endpoint: 'projectNameList/StagedTransactions',
            body: payloadgen,
          });

          $variables.insertStatus = false;
        }
      }
      await Actions.fireNotificationEvent(context, {
        displayMode: 'transient',
        type: 'confirmation',
        summary: 'Material Request Saved',
      });

      await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--2077968578-1',
        method: 'close',
      });

      await Actions.callChain(context, {
        chain: 'searchButtonActionChain',
      });
    }
  }

  return SaveButtonActionChain;
});
