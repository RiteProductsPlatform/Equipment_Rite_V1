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

      const popUpOpen = await Actions.callComponentMethod(context, {
        selector: '#popUp',
        method: 'open',
      });

      $variables.eqp_id = current.row.equipment_request_id;

      await Actions.callComponentMethod(context, {
        selector: '#table',
        method: 'refresh',
      });
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {number} params.arg1 
     */
    async createPayload(context, { arg1 }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let payload ={
    "equipment_request_id":arg1
      };
      return payload;
    }
    
  }

  return ButtonActionChain2;
});
