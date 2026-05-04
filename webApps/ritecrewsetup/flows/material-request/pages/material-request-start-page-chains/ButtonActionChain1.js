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

      const ojDialog20779685781Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--2077968578-1',
        method: 'close',
      });
    }
  }

  return ButtonActionChain1;
});
