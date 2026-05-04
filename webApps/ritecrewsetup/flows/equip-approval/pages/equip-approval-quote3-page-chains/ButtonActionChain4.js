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

  class ButtonActionChain4 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const ojDialog5593265081Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--559326508-1',
        method: 'close',
      });
    }
  }

  return ButtonActionChain4;
});
