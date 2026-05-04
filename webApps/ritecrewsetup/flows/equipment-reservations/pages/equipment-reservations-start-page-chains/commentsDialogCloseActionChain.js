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

  class commentsDialogCloseActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const commentsDialogClose = await Actions.callComponentMethod(context, {
        selector: '#commentsDialog',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.commentsDialogObj',
  ],
      });
    }
  }

  return commentsDialogCloseActionChain;
});
