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

  class disbandDlgopenAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.disbandCrewObj',
        ],
      });

      const callComponentMethodDisbandAppDialogCloseResult = await Actions.callComponentMethod(context, {
        selector: '#disbandAppDialog',
        method: 'close',
      });

      const callComponentMethodDisbandDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#disbandDialog',
        method: 'open',
      });
    }
  }

  return disbandDlgopenAction;
});
