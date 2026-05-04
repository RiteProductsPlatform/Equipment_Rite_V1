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

  class DemobiliozationNoBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const demobilizeDlgClose = await Actions.callComponentMethod(context, {
        selector: '#demobilizeDlg',
        method: 'close',
      });
    }
  }

  return DemobiliozationNoBtnAction;
});
