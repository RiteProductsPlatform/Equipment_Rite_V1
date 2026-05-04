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

  class CancelSubmitRequestDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodOjDialog12393698201CloseResult = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--1239369820-1',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.selectedRow',
    '$page.variables.EqpMasterWorkOrderADP.data',
  ],
      });
    }
  }

  return CancelSubmitRequestDlgAction;
});
