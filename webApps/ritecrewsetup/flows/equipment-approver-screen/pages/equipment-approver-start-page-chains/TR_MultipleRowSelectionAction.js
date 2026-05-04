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

  class TR_MultipleRowSelectionAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.keys 
     * @param {any} params.selected 
     */
    async run(context, { keys, selected }) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.filterData(selected, $page.variables.isAdd ? $page.variables.AddTimeSheetADP.data : $page.variables.SearchTimeSheetADP, keys, $page.variables.isAdd);

      $page.variables.FilteredData = callFunctionResult;
    }
  }

  return TR_MultipleRowSelectionAction;
});
