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

      await Actions.resetVariables(context, {
        variables: [
    '$variables.EqpMasterWorkOrderADP.data',
  ],
      });

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

      const approverejectDlgClose = await Actions.callComponentMethod(context, {
        selector: '#approverejectDlg',
        method: 'close',
      });

      await Actions.callChain(context, {
        chain: 'SearchBtnAction',
      });
    }
  }

  return CloseApproveRejectDlgAction;
});
