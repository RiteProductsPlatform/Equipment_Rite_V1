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

  class RowlevelRejectBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callFunction = await this.createPayload(context, { arg1: $variables.eqp_id, arg2: 'REJECTED', arg3: $variables.comments });

      try {
        await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postGetEqpRequestApproval',
          body: callFunction,
        });
      } catch (error) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Try Again',
        });
      }

      await Actions.fireNotificationEvent(context, {
        summary: 'Saved Successfully',
        type: 'confirmation',
      });
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {number} params.arg1 
     * @param {string} params.arg2 
     * @param {string} params.arg3 
     */
    async createPayload(context, { arg1, arg2, arg3 }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      let payload={
        "reqStatus":arg2,
        "comments":arg3,
        "equipment_request_id":arg1
      };
      return payload;
    } 
  }

  return RowlevelRejectBtnAction;
});
