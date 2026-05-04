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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodOjDialog16537378171CloseResult = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1653737817-1',
        method: 'close',
      }, { id: 'closeDialog' });
    }
  }

  return ButtonActionChain2;
});
