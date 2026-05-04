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

  class CoreNextButtonChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.presetTab 
     */
    async run(context, { presetTab }) {
      const { $page, $flow, $application } = context;
      console.log("present tab is ");
      console.log(presetTab);
      $page.variables.currentFlow = "page-assets";
        $page.variables.selectedVal = "page-assets";
    }
  }

  return CoreNextButtonChain;
});
