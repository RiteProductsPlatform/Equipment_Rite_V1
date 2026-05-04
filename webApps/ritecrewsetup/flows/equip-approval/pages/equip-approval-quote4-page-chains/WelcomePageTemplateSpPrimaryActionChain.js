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

  class WelcomePageTemplateSpPrimaryActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
        const toCustomerWorkbench = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'customer-workbench',
        history: 'push',
        page: 'customer-workbench-start',
      });
    }
  }

  return WelcomePageTemplateSpPrimaryActionChain;
});
