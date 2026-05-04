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

  class TR_resetBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.searchobj.contract',
          '$page.variables.searchobj.customer',
          '$page.variables.searchobj.date',
          '$page.variables.searchobj.project',
          '$page.variables.searchobj.timecrew',
          '$page.variables.AddTimeSheetADP.data',
          '$page.variables.SearchTimeSheetADP.data',
          '$page.variables.updateTimeSheet',
          '$page.variables.FilteredData',
          '$page.variables.searchobj.crewdate',
          '$page.variables.Columns',
          '$page.variables.searchobj.dateRange',
          '$page.variables.searchobj.specific',
        ],
      });
    }
  }

  return TR_resetBtnAction;
});
