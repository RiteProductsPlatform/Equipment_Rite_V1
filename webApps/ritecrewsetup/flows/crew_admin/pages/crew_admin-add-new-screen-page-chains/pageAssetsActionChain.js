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

  class pageAssetsActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.currentFlow = "page-manufaturer";
      $page.variables.selectedVal = "page-manufaturer";
    }
  }

  return pageAssetsActionChain;
});
