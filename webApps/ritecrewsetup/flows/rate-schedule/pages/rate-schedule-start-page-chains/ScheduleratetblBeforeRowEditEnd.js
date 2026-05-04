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

  class ScheduleratetblBeforeRowEditEnd extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.cancelEdit 
     * @param {any} params.rowKey 
     * @param {number} params.rowIndex 
     * @param {any} params.rowData 
     */
    async run(context, { cancelEdit, rowKey, rowIndex, rowData }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const hourTyperemover = await $functions.hourTyperemover(JSON.stringify($variables.hourTypeADP.data), JSON.stringify($variables.allHourTypes), $variables.scheduleBlankRowData.hour_type);

      $variables.CurrenthourtypeArray = hourTyperemover;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.scheduleTblADP,
        update: {
          data: $variables.scheduleBlankRowData,
          indexes: [rowIndex],
        },
      });
    }
  }

  return ScheduleratetblBeforeRowEditEnd;
});
