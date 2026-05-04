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

  class SubmitDlgOpenAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.selectedRowRequest.start_date = $variables.startdate;
      $variables.selectedRowRequest.end_date = $variables.enddate;

      const submitRequestDlgOpen = await Actions.callComponentMethod(context, {
        selector: '#submitRequestDlg',
        method: 'open',
      });
    }
  }

  return SubmitDlgOpenAction;
});
