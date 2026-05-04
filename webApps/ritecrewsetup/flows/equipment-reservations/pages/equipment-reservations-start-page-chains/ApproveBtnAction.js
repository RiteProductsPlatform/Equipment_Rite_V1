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

  class ApproveBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const validateGroup = await $application.functions.validateGroup('allocateVal');

      if (validateGroup === 'valid') {
        const results = await ActionUtils.forEach($variables.SelectedRows, async (item, index) => {

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postGetReservationStatus',
            body: { "hdrId": $variables.SelectedRows[index].crewsetup_eqp_header_id, "p_contract_id": $variables.contractid, "P_contract_number": $variables.contract, "P_bill_plan_name": $variables.billplan, "P_bill_plan_id": $variables.billplanId, "P_nonlabor_rate_override_id": $variables.glID, "P_override_rate": $variables.billRateVar },
          });

          const response3 = await Actions.callRest(context, {
            endpoint: 'icsEndpoint/patchTREQPBILLRATEOVERRIDE1_0BillRateOverride',
            uriParams: {
              'CREWSETUP_EQP_HEADER_ID': $variables.SelectedRows[index].crewsetup_eqp_header_id,
            },
          });
        }, { mode: 'serial' });

        await Actions.callChain(context, {
          chain: 'CloseOverrideDlgAction',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Approval Initiated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }
    }
  }

  return ApproveBtnAction;
});
