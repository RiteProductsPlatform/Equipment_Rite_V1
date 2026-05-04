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

  class DisbandCrewdlgCloseAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodDisbandDialogCloseResult = await Actions.callComponentMethod(context, {
        selector: '#disbandDialog',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.disbandCrewObj',
        ],
      });
    }
  }

  return DisbandCrewdlgCloseAction;
});
