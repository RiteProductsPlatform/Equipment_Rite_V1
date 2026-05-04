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

  class DemobilizeApproveBtnAction extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putGetEqpRequestApproval',
        body: {equipment_request_id: $page.variables.selectionrow.equipment_request_id,  eqp_master_status: $variables.eqpstatus},
      });

      if (!response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Approve the Request',
          displayMode: 'transient',
        });
      
        return;
      } else {
        const approverejectDlgClose = await Actions.callComponentMethod(context, {
          selector: '#approverejectDlg',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Request Approved Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }
    }
  }

  return DemobilizeApproveBtnAction;
});
