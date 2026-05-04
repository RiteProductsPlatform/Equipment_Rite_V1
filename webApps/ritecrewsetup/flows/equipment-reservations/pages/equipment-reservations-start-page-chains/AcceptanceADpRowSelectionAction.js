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

  class AcceptanceADpRowSelectionAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {any} params.rowData 
     */
    async run(context, { rowKey, rowData }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQP_ChecklistAcceptance',
        uriParams: {
          'p_equipment_id': rowData.equipment_id,
        },
      });

      $variables.selecedAcceptance = rowData;

      if (!response.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Checklist',
          displayMode: 'transient',
        });

        return;
      } else {
        if (response.body.items.length > 0) {
          $variables.checklistADP.data = response.body.items;

          const checklistDlgOpen = await Actions.callComponentMethod(context, {
            selector: '#checklistDlg',
            method: 'open',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'There is no Checklist for the selected  Record.So Acceptance Initiated Successfully',
          });

        }


      }

    }
  }

  return AcceptanceADpRowSelectionAction;
});
