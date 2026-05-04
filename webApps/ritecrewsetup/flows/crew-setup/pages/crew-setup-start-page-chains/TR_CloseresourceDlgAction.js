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

  class TR_CloseresourceDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodResourceDialogCloseResult = await Actions.callComponentMethod(context, {
        selector: '#resourceDialog',
        method: 'close',
      });
    }
  }

  return TR_CloseresourceDlgAction;
});
