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

  class deleteRowButtonActionChain extends ActionChain {

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
// debugger;
      await Actions.fireDataProviderEvent(context, {
        target: $variables.scheduleTblADP,
        remove: {
          indexes: [index],
        },
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.scheduleTblADP,
        refresh: null,
      });
    }
  }

  return deleteRowButtonActionChain;
});
