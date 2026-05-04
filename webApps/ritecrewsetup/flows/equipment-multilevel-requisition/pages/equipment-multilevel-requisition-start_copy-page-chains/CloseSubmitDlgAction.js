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

  class CloseSubmitDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.selectedRowRequest',
          '$page.variables.EqpMasterWorkOrderADP.data',
        ],
      });

      const submitRequestDlgClose = await Actions.callComponentMethod(context, {
        selector: '#submitRequestDlg',
        method: 'close',
      });
    }
  }

  return CloseSubmitDlgAction;
});
