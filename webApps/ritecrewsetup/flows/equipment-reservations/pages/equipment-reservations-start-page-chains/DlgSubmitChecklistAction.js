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

      let FailedAPIName = '';

      try {
      

debugger;
      const results = await ActionUtils.forEach($variables.selectedCheckList, async (item, index) => {
        
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postGetReservationStatus',
          headers: {
              'R_PAGE_NAME': 'equipment-reservations',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
          body: {
            hdrId: $variables.selecedAcceptance.crewsetup_eqp_header_id,
            'p_contract_id': $variables.selecedAcceptance.contract_id,
            'P_contract_number': '',
            'P_bill_plan_name': $variables.selecedAcceptance.bill_plan_name,
            'P_bill_plan_id': $variables.selecedAcceptance.bill_plan_id,
            'P_nonlabor_rate_override_id': $variables.selecedAcceptance.nonlabor_rate_override_id,
            'P_override_rate': $variables.selecedAcceptance.bill_rate,
            'p_check_list_name': $variables.selectedCheckList[index].check_list_name,
            'p_agreed_status': 'Y',
          },
        });
        if (!response.ok) {
            let errMsg =
              response.body?.detail ||
              response.body?.message ||
              (typeof response.body === 'string' ? response.body : null) ||
              response.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }
      }, { mode: 'serial' });

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const results2 = await ActionUtils.forEach($variables.checklistADP.data, async (item, index) => {

        let data =
        {
          "p_check_list_name": item.check_list_name,
          "hdrid": $variables.selecedAcceptance.crewsetup_eqp_header_id,
          "p_inspection_section": item.section,
          "p_notes": item.notes,
          "p_pass_fail": item.status,
          "p_role": "Equipment Acceptance Inspection"
        };
        FailedAPIName = 'postEQPInspectionApproval';
        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
          headers: {
              'R_PAGE_NAME': 'equipment-reservations',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
          body: data,
        });

        if (response3.ok) {
          $variables.isinspapproval = true;
        }else{
          $variables.isinspapproval = false;
          
        }
      }, { mode: 'serial' });
      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

      if ($variables.isinspapproval) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Approval Initiated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
        const checklistDlgClose2 = await Actions.callComponentMethod(context, {
          selector: '#checklistDlg',
          method: 'close',
        });
      }else{

        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Initiate Approval',
          displayMode: 'transient',
          type: 'error',
        });
        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
        
      }
      FailedAPIName = 'patchTREQPBILLRATEOVERRIDE1_0BillRateOverride';
      const response2 = await Actions.callRest(context, {
        endpoint: 'icsEndpoint/patchTREQPBILLRATEOVERRIDE1_0BillRateOverride',
        uriParams: {
          'CREWSETUP_EQP_HEADER_ID': $variables.selecedAcceptance.crewsetup_eqp_header_id,
        },
      });
      if (!response2.ok) {
          let errMsg =
            response2.body?.detail ||
            response2.body?.message ||
            (typeof response2.body === 'string' ? response2.body : null) ||
            response2.statusText ||
            'Unknown API Error';

          throw new Error(errMsg);
        }

      if (!response2.ok) {

        return;
      } else {
        const checklistDlgClose = await Actions.callComponentMethod(context, {
          selector: '#checklistDlg',
          method: 'close',
        });
      }
       } catch (error) {
        const loadingDialogClose3 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response5 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'equipment-reservations',
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": FailedAPIName,
            "p_debug_message": errorMessage
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });
      }
    }
  }

  return DlgSubmitChecklistAction;
});
