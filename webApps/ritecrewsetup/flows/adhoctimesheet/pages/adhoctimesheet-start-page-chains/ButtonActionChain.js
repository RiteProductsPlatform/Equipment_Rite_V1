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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.rowdata',
  ],
      });

      const timesheetdlgClose = await Actions.callComponentMethod(context, {
        selector: '#timesheetdlg',
        method: 'close',
      });
    }
  }

  return ButtonActionChain;
});
