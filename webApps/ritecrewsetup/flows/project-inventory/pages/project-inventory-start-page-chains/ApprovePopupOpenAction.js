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

  class ApprovePopupOpenAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.DetailsTblADP.data',
    '$page.variables.projDetailsADP.data',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_EqpDetailSearch',
        uriParams: {
          'p_equipment_name': $variables.selectionrow.equipment_name,
          'p_equipment_resource_class':$variables.selectionrow.equipment_resource_class,
          'p_end_date': $functions.dateformatter($variables.selectionrow.effective_start_date),
          'p_start_date': $functions.dateformatter($variables.selectionrow.effective_end_date),
        },
      });

      $variables.dlglabel = 'Approve';
      $variables.DetailsTblADP.data = response.body.items;

      const approverejectDlgOpen = await Actions.callComponentMethod(context, {
        selector: '#approverejectDlg',
        method: 'open',
      });
    }
  }

  return ApprovePopupOpenAction;
});
