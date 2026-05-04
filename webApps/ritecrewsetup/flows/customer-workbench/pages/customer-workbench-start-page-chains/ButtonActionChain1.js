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
      const { $page, $flow, $application, $constants, $variables } = context;

      const ojDialog4880457901Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-488045790-1',
        method: 'close',
      });
    }
  }

  return ButtonActionChain1;
});
