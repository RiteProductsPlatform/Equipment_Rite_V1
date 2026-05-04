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

  class InputSearchValueActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     * @param {any} params.itemContext 
     */
    async run(context, { value, itemContext }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireNotificationEvent(context, {
        summary: itemContext,
      });

      await Actions.callChain(context, {
        chain: 'ResetBtnAction',
      });
    }
  }

  return InputSearchValueActionChain;
});
