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

  class ButtonActionChain3 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callFunction = await this.createPayload(context);

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putGetEqpRequestApproval',
      });
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.arg1 
     */
    async createPayload(context, { arg1 }) {
      const { $page, $flow, $application, $constants, $variables } = context;
    
    let payload ={
"equipment_request_id":arg1
    };
    return payload;
    }
  }

  return ButtonActionChain3;
});
