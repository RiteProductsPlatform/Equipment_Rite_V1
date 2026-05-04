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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.paramID 
     */
    async run(context, { paramID }) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.consoleFunc(paramID);
    }
  }

  return ButtonActionChain1;
});
