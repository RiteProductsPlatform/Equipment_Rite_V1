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

  class eqpPairingDeleteButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {object} params.current
     */
    async run(context, { event, originalEvent, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.eqpPairingAdp,
        remove: {
          keys: [
  current.eqp_suggestion_id,
],
        },
      });
    }
  }

  return eqpPairingDeleteButtonActionChain;
});
