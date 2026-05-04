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

  class TableMultipleSelectedChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.keys 
     * @param {any} params.selected 
     */
    async run(context, { keys, selected }) {
      const { $page, $flow, $application } = context;

      console.log("proxyObj", Object.values(selected));
      $page.variables.FilteredData.push(Object.value(selected));

      console.log("MultiSel", $page.variables.selectedRow);
    }
  }

  return TableMultipleSelectedChangeChain;
});
