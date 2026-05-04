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

  class clarificationActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
       await Actions.fireNotificationEvent(context, {
        summary: 'The request has been successfully sent to the Equipment Manager',
        displayMode: 'transient',
        type: 'confirmation',
      });
    }
  }

  return clarificationActionChain;
});
