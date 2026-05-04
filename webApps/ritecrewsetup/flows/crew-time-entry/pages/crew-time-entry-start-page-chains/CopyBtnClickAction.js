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

  class CopyBtnClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.projectBasedRowData = current.row;
      $variables.Dialoguelabel = 'Copy';

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.projectBasedRowData.hours_type  ',
    '$page.variables.projectBasedRowData.mon_quantity',
    '$page.variables.projectBasedRowData.tue_quantity',
    '$page.variables.projectBasedRowData.wed_quantity',
    '$page.variables.projectBasedRowData.thu_quantity',
    '$page.variables.projectBasedRowData.fri_quantity',
    '$page.variables.projectBasedRowData.sat_quantity',
    '$page.variables.projectBasedRowData.sun_quantity',
    '$page.variables.projectBasedRowData.cost_rate',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',
        uriParams: {
          'p_rate_schedule_name': $page.variables.projectBasedRowData.rate_schedule_name,
        },
      });

      $variables.crewHoursTypeCost = response.body.items;
      const timesDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'open',
      });
    }
  }

  return CopyBtnClickAction;
});
