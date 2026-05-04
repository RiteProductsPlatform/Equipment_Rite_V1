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

  class DlgSubmitChecklistAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      let obj = {
        "equipment_request_id": $variables.inspectionobj.data.equipment_request_id,
        "eqp_master_status": "EQP MANAGER INSPECTION"
      };

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
        body: obj,
      });

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const results = await ActionUtils.forEach($variables.checklistADP.data, async (item, index) => {
        let data =
        {
          "p_check_list_name": item.check_list_name,
          "hdrid":  $variables.inspectionobj.data.crewsetup_eqp_header_id,
          "p_inspection_section": item.section,
          "p_notes": item.notes,
          "p_pass_fail": item.status,
          "p_file_name":"",
          "p_file_type":"",
          "p_file_content":"",
          "p_save_draft_flag":"Y",
          "p_role": "Equipment Manager Inspection",
          "p_equipment_request_id":"",
          "p_agreed_status":""
        };

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
          body: data,
        });

      }, { mode: 'serial' });

      if (response.ok) {
        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const checklistDlgClose = await Actions.callComponentMethod(context, {
          selector: '#checklistDlg',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Inspection Saved',
          displayMode: 'transient',
          type: 'confirmation',
        });
      } else {
        const checklistDlgClose2 = await Actions.callComponentMethod(context, {
          selector: '#checklistDlg',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Inspection Failed',
          displayMode: 'transient',
          type: 'error',
        });

      }
    }
  }

  return DlgSubmitChecklistAction;
});
