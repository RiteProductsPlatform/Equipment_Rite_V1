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

  class PayrolUnlockBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.isPayRollLock = false;

      await Actions.callChain(context, {
        id: 'PayrollLockunlock',
      });
    }
  }

  return PayrolUnlockBtnAction;
});
