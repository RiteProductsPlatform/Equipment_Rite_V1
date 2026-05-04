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
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toCreateRentalAgreementStart = await Actions.navigateToPage(context, {
        page: 'create-rental-agreement-start',
      });
    }
  }

  return WelcomePageTemplateSpPrimaryActionChain;
});
