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

  class PayrollLockBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.isPayRollLock = true;

      await Actions.callChain(context, {
        id: 'PayrollLockunlock',
      });
    }
  }

  return PayrollLockBtnAction;
});
