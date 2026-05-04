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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const ojDialog12393698203Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--1239369820-3',
        method: 'close',
      });
    }
  }

  return ButtonActionChain;
});
