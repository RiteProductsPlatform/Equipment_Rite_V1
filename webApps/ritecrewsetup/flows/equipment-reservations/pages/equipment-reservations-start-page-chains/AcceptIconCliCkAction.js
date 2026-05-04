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

  class AcceptIconCliCkAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.selecedAcceptance = current.row;
      $variables.hdrId = current.row.crewsetup_eqp_header_id;

      if (current.row.equipment_resource_class === "BULK ITEMS" || current.row.equipment_resource_class === "SMALL TOOLS" ||current.row.equipment_resource_class==="CONSUMABLES") {
        let obj = {
          "status":"ASSIGNED",
          "p_contract_id": current.row.contract_id,
          "p_contract_number": current.row.contract_number,
          "p_bill_plan_name ": current.row.bill_plan_name,
          "p_bill_plan_id": current.row.bill_plan_id,
          " p_nonlabor_rate_override_id": current.row.nonlabor_rate_override_id,
          "p_override_rate": current.row.override_rate,
          "hdrid": current.row.crewsetup_eqp_header_id
        };

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_AcceptBulkItems',
          body: obj,
        });

        if (response2.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Equipment Accepted Sucessfully',
            displayMode: 'transient',
            type: 'confirmation',
          });
          
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Accept Equipment',
            displayMode: 'transient',
            type: 'error',
          });
          
        }
      } else {
        const toShell = await Actions.navigateToPage(context, {
          page: '/shell/equip-inspection/project-inventory-start',
          params: {
            selectedrow: current.row,
            label: current.row.status === 'ASSIGNED' ? 'View':'Edit',
          },
        });

      }

      // }
    }
  }

  return AcceptIconCliCkAction;
});
