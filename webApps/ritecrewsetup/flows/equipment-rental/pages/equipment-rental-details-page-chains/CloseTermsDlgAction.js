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

  class CloseTermsDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const termsDlgClose = await Actions.callComponentMethod(context, {
        selector: '#termsDlg',
        method: 'close',
      });
    }
  }

  return CloseTermsDlgAction;
});
