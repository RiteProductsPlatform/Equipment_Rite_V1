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

  class extendRequestDailogCloseActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const extendRequestDialogClose = await Actions.callComponentMethod(context, {
        selector: '#extendRequestDialog',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.extensionReqObj',
  ],
      });
    }
  }

  return extendRequestDailogCloseActionChain;
});
