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

  class TableFirstSelectedRowChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {any} params.rowData 
     * @param {object[]} params.keys 
     * @param {any} params.selected 
     */
    async run(context, { rowKey, rowData, keys, selected }) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.filterData(selected, $page.variables.projectBasedTimesheetADP.data, keys, 'false');

      $page.variables.FilteredData = callFunctionResult;
    }
  }

  return TableFirstSelectedRowChangeChain;
});
