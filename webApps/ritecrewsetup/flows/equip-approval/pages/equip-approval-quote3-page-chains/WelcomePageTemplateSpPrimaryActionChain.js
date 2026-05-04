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
      const toCustomerRequest = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'customer-request',
        history: 'push',
        page: 'equip-approval-start',
      });
    }
  }

  return WelcomePageTemplateSpPrimaryActionChain;
});
