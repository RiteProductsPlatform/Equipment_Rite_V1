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
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodCustSearchCloseResult = await Actions.callComponentMethod(context, {
        selector: '#custSearch',
        method: 'close',
      });
    }
  }

  return ButtonActionChain1;
});
