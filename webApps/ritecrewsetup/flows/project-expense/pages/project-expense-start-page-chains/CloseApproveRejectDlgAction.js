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

  class CloseApproveRejectDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const approverejectDlgClose = await Actions.callComponentMethod(context, {
        selector: '#approverejectDlg',
        method: 'close',
      });
    }
  }

  return CloseApproveRejectDlgAction;
});
