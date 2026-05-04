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

  class openpopup extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.iotDelete_obj.data = current.row;
      $variables.iotDelete_obj.index = index;
      $variables.iotDelete_obj.key = key;

      const iotpopupOpen = await Actions.callComponentMethod(context, {
        selector: '#iotpopup',
        method: 'open',
      });
    }
  }

  return openpopup;
});
