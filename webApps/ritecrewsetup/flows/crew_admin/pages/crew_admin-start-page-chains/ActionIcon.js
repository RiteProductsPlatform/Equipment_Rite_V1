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

  class ActionIcon extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.selectedRow',
        ],
      });

      $page.variables.selectedRow = current.row;

      const callComponentMethodInfoPopupOpenResult = await Actions.callComponentMethod(context, {
        selector: '#info-popup',
        method: 'open',
      });
    }
  }

  return ActionIcon;
});
