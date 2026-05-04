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

  class closeCopyTimeActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const copyDialogClose = await Actions.callComponentMethod(context, {
        selector: '#copyDialog',
        method: 'close',
      });
    }
  }

  return closeCopyTimeActionChain;
});
