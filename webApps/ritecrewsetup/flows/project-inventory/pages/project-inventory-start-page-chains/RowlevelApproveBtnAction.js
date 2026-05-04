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

      let allSuccess = true; // Track overall result

      for (let i = 0; i < $variables.eqpnums.length; i++) {
        const restdata = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putGetEqpRequestApproval',
          body: {
            equipment_request_id: $page.variables.selectionrow.equipment_request_id,
            eqp_master_status: $variables.eqpstatus,
            p_equipment_number: $variables.eqpnums[i].equipment_number,
            p_auto_costing: $variables.eqpnums[i].costing === 'Yes' ? 'Yes' : 'No'
          },
        });

        if (!restdata.ok) {
          allSuccess = false;
          break;
        }


      }

      if (allSuccess) {
        const approverejectDlgClose = await Actions.callComponentMethod(context, {
          selector: '#approverejectDlg',
          method: 'close',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_PRWReqDelete',
          uriParams: {
            'p_eqp_request_number': $page.variables.selectionrow.eqp_request_number,
          },
        });
        let obj =
        {
          "Message": "FYI- Request No."+ $page.variables.selectionrow.eqp_request_number+"  has been approved by "  + $application.variables.user,
          "TaskCreator":$application.variables.user,
          "Role_Name": "OII Equipment Requestor"
        };
        const response2 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',
          body: obj,
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Submitted Successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Submit Successfully',
          displayMode: 'transient',
        });
      }
    }
  }

  return RowlevelApproveBtnAction;
});
