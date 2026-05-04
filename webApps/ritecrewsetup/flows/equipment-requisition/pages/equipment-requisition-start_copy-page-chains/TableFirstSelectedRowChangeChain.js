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
     */
    async run(context, { rowKey, rowData }) {
      const { $page, $flow, $application } = context;

      $page.variables.selectedRow = rowData;
      $page.variables.selectedRow.start_date = $page.variables.SearchObj.StartDate;
      $page.variables.selectedRow.end_date = $page.variables.SearchObj.EndDate;
      $page.variables.selectedRow.requestor_name = "oak";

    }
  }

  return TableFirstSelectedRowChangeChain;
});
