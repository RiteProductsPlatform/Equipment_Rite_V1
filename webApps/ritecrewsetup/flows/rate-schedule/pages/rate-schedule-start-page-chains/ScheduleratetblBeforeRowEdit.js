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

  class ScheduleratetblBeforeRowEdit extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {number} params.rowIndex 
     * @param {any} params.rowData 
     */
    async run(context, { rowKey, rowIndex, rowData }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/getall_HoursType',
      });

      let filterhourtype = await $functions.filterhourtype($variables.CurrenthourtypeArray.length > 0 ? JSON.stringify($variables.CurrenthourtypeArray) : "[]", response.body.items.length > 0 ? JSON.stringify(response.body.items) : "[]", rowData.hour_type);

      $variables.hourTypeADP.data = filterhourtype;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.scheduleBlankRowData',
  ],
      });

      $variables.scheduleBlankRowData = rowData;
    }
  }

  return ScheduleratetblBeforeRowEdit;
});
