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

  class CreatebillingRatebtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toShell = await Actions.navigateToPage(context, {
        page: '/shell/rate-schedule/rate-schedule-start',
      });
    }
  }

  return CreatebillingRatebtnAction;
});
