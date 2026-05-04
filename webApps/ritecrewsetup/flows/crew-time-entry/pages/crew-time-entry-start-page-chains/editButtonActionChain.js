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

  class editButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
       $page.variables.projectBasedRowData = $variables.selectedRowdata;
      $page.variables.EditType = 'Edit';
      $page.variables.Dialoguelabel = 'Edit';
      $page.variables.projectBasedRowData.fri_usage = $variables.selectedRowdata.fri_quantity;
      $page.variables.projectBasedRowData.mon_usage = $variables.selectedRowdata.mon_quantity;
      $page.variables.projectBasedRowData.sat_usage = $variables.selectedRowdata.sat_quantity;
      $page.variables.projectBasedRowData.sun_usage = $variables.selectedRowdata.sun_quantity;
      $page.variables.projectBasedRowData.thu_usage = $variables.selectedRowdata.thu_quantity;
      $page.variables.projectBasedRowData.tue_usage = $variables.selectedRowdata.tue_quantity;
      $page.variables.projectBasedRowData.wed_usage = $variables.selectedRowdata.wed_quantity;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',
        uriParams: {
          'p_rate_schedule_name': $page.variables.projectBasedRowData.rate_schedule_name,
        },
      });

      $variables.crewHoursTypeCost = response.body.items;

      const callComponentMethodTimesDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'open',
      });
    }
  }

  return editButtonActionChain;
});
