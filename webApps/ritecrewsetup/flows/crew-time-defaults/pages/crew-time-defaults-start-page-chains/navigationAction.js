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

  class navigationAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.selection 
     */
    async run(context, { selection }) {
      const { $page, $flow, $application } = context;

      $page.variables.varTabSelection = selection;
    }
  }

  return navigationAction;
});
