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

  class ADDSubButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

        $variables.eqpSubstitute_copy.uid = $page.variables.substituteADP.data.length === 0 ? 1
        : Math.max(...$page.variables.substituteADP.data.map(obj => obj.uid)) + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.substituteADP,
        add: {
          data: $variables.eqpSubstitute_copy,
        },
      });
    }
  }

  return ADDSubButtonActionChain;
});
