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

  class NoApproveBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const results = await ActionUtils.forEach($variables.SelectedRows, async (item, index) => {

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postGetReservationStatus',
          body: { "hdrId": $variables.SelectedRows[index].crewsetup_eqp_header_id, "p_contract_id": "", "P_contract_number": "", "P_bill_plan_name": "", "P_bill_plan_id": "", "P_nonlabor_rate_override_id": "", "P_override_rate": "" },
        });
      }, { mode: 'serial' });

      await Actions.fireNotificationEvent(context, {
        summary: 'Approval Initiated Successfully',
        displayMode: 'transient',
        type: 'confirmation',
      });

      const equipmentOverrideDlgClose = await Actions.callComponentMethod(context, {
        selector: '#EquipmentOverrideDlg',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.eqpOverride',
  ],
      });
    }
  }

  return NoApproveBtnAction;
});
