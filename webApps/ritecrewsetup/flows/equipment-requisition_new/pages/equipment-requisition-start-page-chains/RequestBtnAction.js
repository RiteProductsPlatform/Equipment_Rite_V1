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

  class RequestBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.selectedRow',
        ],
      });

      const callComponentMethodOjDialog12393698201OpenResult = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--1239369820-1',
        method: 'open',
      });

      $variables.selectedRow.requestor_name = 'OAK';
      $variables.selectedRow.equipment_number = current.row.equipment_number;
      $variables.selectedRow.equipment_name = current.row.equipment_name;
      $variables.selectedRow.equipment_id = current.row.equipment_id;
      $variables.selectedRow.equipment_class = current.row.equipment_class;
      $variables.selectedRow.start_date = $variables.SearchObj.StartDate;
      $variables.selectedRow.end_date = $variables.SearchObj.EndDate;
      $variables.selectedRow.equipment_type = current.row.equipment_type;
      $variables.selectedRow.schedule_cost_rate = current.row.schedule_cost_rate;
      $variables.equplatitude = current.row.latitude;
      $variables.equplongitude = current.row.longitude;

    }
  }

  return RequestBtnAction;
});
