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

  class TabBarSelectionChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.selection 
     * @param {string} params.updatedFrom 
     */
    async run(context, { selection, updatedFrom }) {
      const { $page, $flow, $application } = context;

      if (updatedFrom !== 'external') {
        $page.variables.selectedVal = selection;        
      }
    }
  }

  return TabBarSelectionChangeChain;
});
