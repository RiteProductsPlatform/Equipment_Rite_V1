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

  class SaveandShipOutBtnAction extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $variables, $functions } = context;


      await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const initialUpdatePayload = {
        "equipment_request_id": $variables.selectedrow.equipment_request_id,
        "inspection_stage": "Eqp Manager - Check Out",
        "eqp_master_status": "EQP MANAGER INSPECTION"
      };



      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
        body: initialUpdatePayload,
      });


      if (!response.ok) {
        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });



        await Actions.fireNotificationEvent(context, {
          summary: 'Initial status update failed',
          displayMode: 'transient',
          type: 'error',
        });

        return;
      } else {
        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Shipped Out Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }



      await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });


    }
  }

  return SaveandShipOutBtnAction;
});
