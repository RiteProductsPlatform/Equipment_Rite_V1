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

  class TR_TableFirstSelectedRowChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {any} params.rowData 
     */
    async run(context, { rowKey, rowData }) {
      const { $page, $flow, $application } = context;

      $page.variables.SearchRowdata = rowData;

      $page.variables.updateTimeSheet = rowData;
      $page.variables.selectedFlag = rowData.ext_time_diff_flag;
    }


  }

  return TR_TableFirstSelectedRowChangeChain;
});
