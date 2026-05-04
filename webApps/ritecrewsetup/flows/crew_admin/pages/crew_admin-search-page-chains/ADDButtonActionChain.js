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

  class ADDButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.equipmentPairing.uid = $page.variables.editPairingADP.data.length === 0 ? 1
        : Math.max(...$page.variables.editPairingADP.data.map(obj => obj.uid)) + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.editPairingADP,
        add: {
          data: $variables.equipmentPairing_copy,
        },
      });
    }
  }

  return ADDButtonActionChain;
});
