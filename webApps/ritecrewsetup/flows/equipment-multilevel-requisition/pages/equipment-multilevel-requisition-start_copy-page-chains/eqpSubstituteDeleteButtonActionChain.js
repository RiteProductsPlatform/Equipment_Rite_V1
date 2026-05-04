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

  class eqpSubstituteDeleteButtonActionChain extends ActionChain {

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
        target: $variables.eqpSubstituteAdp,
        remove: {
          keys: [current.eqp_substitute_id],
        },
      });
    }
  }

  return eqpSubstituteDeleteButtonActionChain;
});
