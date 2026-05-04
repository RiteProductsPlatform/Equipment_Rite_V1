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

  class closeAppDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodDisbandAppDialogCloseResult = await Actions.callComponentMethod(context, {
        selector: '#disbandAppDialog',
        method: 'close',
      });
    }
  }

  return closeAppDlgAction;
});
