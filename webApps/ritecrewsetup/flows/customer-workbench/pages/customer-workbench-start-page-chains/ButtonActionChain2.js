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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.currentRow.rowData = current.row;
      $variables.currentRow.rowindex = index;
      $variables.currentRow.rowKey = key;

      const actionpopupOpen = await Actions.callComponentMethod(context, {
        selector: '#actionpopup',
        method: 'open',
      });
    }
  }

  return ButtonActionChain2;
});
