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

  class copyButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      $variables.projectBasedRowData = $variables.selectedRowdata;
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

  return copyButtonActionChain;
});
