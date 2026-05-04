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

  class RowlevelApproveBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putGetEqpRequestApproval',
        body: { "equipment_request_id": $variables.eqp_id,"eqp_master_status":$variables.eqpstatus},
      });

      await Actions.fireNotificationEvent(context, {
        summary: 'Submitted Successfully',
        type: 'confirmation',
      });

      const popUpClose = await Actions.callComponentMethod(context, {
        selector: '#popUp',
        method: 'close',
      });
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {number} params.arg1 
     */
    async createPayload(context, { arg1 }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      let payload = {
        "equipment_request_id":arg1
      };
      return payload;
    }
  }

  return RowlevelApproveBtnAction;
});
