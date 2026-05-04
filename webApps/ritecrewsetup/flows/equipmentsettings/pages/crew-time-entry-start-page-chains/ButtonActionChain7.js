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

  class ButtonActionChain7 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const settingsDetailPageClose = await Actions.callComponentMethod(context, {
        selector: '#Settings_Detail_Page',
        method: 'close',
      });
    }
  }

  return ButtonActionChain7;
});
