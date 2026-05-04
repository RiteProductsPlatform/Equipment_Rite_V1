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

  class ButtonActionChain5 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     * @param {any} params.rowData 
     */
    async run(context, { key, index, current, rowData }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.getGetAllocationDataListADP',
  ],
      });

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetReqApprAllocationData',
        uriParams: {
          'p_end_date': rowData.effective_end_date.split('T')[0],
          'p_start_date': rowData.effective_start_date.split('T')[0],
          'p_equipment_id': rowData.equipment_id,
        },
      });

      if (response2.ok) {

        $variables.getGetAllocationDataListADP.data = response2.body.items;

        const ojDialogAllocationDetailsOpen = await Actions.callComponentMethod(context, {
          selector: '#oj-dialog-allocation-details',
          method: 'open',
        });
      }
    }
  }

  return ButtonActionChain5;
});
