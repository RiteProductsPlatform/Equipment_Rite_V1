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

  class viewBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetReqApprAllocationData',
        uriParams: {
          'p_end_date': $functions.dateformatter($variables.selectionrow.effective_end_date),
          'p_start_date': $functions.dateformatter($variables.selectionrow.effective_start_date),
          'p_equipment_id': current.row.equipment_id,
        },
      });

      if (!response.ok) {

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.projDetailsADP.data',
  ],
        });

        return;
      } else {
          $variables.projDetailsADP.data = response.body.items;
      }

    }
  }

  return viewBtnAction;
});
