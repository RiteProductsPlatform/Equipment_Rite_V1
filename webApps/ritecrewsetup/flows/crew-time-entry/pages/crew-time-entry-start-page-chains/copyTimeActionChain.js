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

  class copyTimeActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const copyDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#copyDialog',
        method: 'open',
      });
    }
  }

  return copyTimeActionChain;
});
