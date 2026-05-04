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

  class DemobilizeDialogCloseButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.demobObj',
  ],
      });

      const demobilizeClose = await Actions.callComponentMethod(context, {
        selector: '#demobilize',
        method: 'close',
      });
    }
  }

  return DemobilizeDialogCloseButtonActionChain;
});
