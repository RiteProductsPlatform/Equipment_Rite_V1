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

      const callComponentMethodOjDialog21183946101CloseResult = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-2118394610-1',
        method: 'close',
      });
    }
  }

  return ButtonActionChain1;
});
