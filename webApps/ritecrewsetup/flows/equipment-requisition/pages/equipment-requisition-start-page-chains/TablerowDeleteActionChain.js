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

  class TablerowDeleteActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      await Actions.fireDataProviderEvent(context, {
        target: $variables.payloadADP,
        remove: {
          indexes: [index],
        },
      });

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.payloadADP,
      });
    }
  }

  return TablerowDeleteActionChain;
});
