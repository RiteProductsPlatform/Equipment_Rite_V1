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

  class SubmitTermsDlgopenAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // ---- TODO: Add your code here ---- //
      console.log("######",$flow.variables.syncCartArray)
      const termsDlgOpen = await Actions.callComponentMethod(context, {
        selector: '#termsDlg',
        method: 'open',
      });
    }
  }

  return SubmitTermsDlgopenAction;
});
