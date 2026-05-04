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

  class cancelDialogCloseActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const cancelDialogClose = await Actions.callComponentMethod(context, {
        selector: '#cancelDialog',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.cancelReqObj',
  ],
      });
    }
  }

  return cancelDialogCloseActionChain;
});
