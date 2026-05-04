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

  class CancelCheckListDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const checklistDlgClose = await Actions.callComponentMethod(context, {
        selector: '#checklistDlg',
        method: 'close',
      });
    }
  }

  return CancelCheckListDlgAction;
});
