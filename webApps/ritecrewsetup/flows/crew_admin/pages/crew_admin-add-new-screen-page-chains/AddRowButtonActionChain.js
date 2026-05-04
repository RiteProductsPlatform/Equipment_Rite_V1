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

  class AddRowButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.eqpPairing_copy.uid = $variables.paringADP.data.length === 0 ? 1
        : Math.max(...$variables.paringADP.data.map(obj => obj.uid)) + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.paringADP,
        add: {
          data: $variables.eqpPairing_copy,
        },
      });
    }
  }

  return AddRowButtonActionChain;
});
