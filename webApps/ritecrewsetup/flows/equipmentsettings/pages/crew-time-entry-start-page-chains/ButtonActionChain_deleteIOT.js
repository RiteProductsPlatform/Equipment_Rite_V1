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

  class ButtonActionChain_deleteIOT extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
debugger;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.getDataIOT,
        remove: {
          data: current.row,
          indexes: index,
          keys: key,
        },
      });
    }
  }

  return ButtonActionChain_deleteIOT;
});
