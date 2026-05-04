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

  class CloseDetailsDialogueAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const requestdetailsClose = await Actions.callComponentMethod(context, {
        selector: '#requestdetails',
        method: 'close',
      });
    }
  }

  return CloseDetailsDialogueAction;
});
