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

  class ButtonActionChain_ADD extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.callChain(context, {
        chain: 'ButtonActionChain_addIOT',
      });

      const iotpopupClose = await Actions.callComponentMethod(context, {
        selector: '#iotpopup',
        method: 'close',
      });
    }
  }

  return ButtonActionChain_ADD;
});
