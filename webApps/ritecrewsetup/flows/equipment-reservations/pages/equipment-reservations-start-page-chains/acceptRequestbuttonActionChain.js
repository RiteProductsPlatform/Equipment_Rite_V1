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

  class acceptRequestbuttonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      try {

// debugger;
        if ($variables.selecedAcceptance.equipment_resource_class === "BULK ITEMS" ||$variables.selecedAcceptance.equipment_resource_class === "SMALL TOOLS" || $variables.selecedAcceptance.equipment_resource_class==="CONSUMABLES" ) {
          let obj = {
            "status":"ASSIGNED",
            "p_contract_id": $variables.selecedAcceptance.contract_id,
            "p_contract_number": $variables.selecedAcceptance.contract_number,
            "p_bill_plan_name ": $variables.selecedAcceptance.bill_plan_name,
            "p_bill_plan_id": $variables.selecedAcceptance.bill_plan_id,
            " p_nonlabor_rate_override_id": $variables.selecedAcceptance.nonlabor_rate_override_id,
            "p_override_rate": $variables.selecedAcceptance.override_rate,
            "hdrid":  $variables.hdrId
          };
           const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_AcceptBulkItems',
            headers: {
              'R_PAGE_NAME': 'equipment-reservations',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
            body: obj,
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
        }
        else {
          const toShell2 = await Actions.navigateToPage(context, {
            page: '/shell/equip-inspection/project-inspection-start',
            params: {
              label: $variables.selecedAcceptance.status === 'ASSIGNED' ? 'View':'Edit',
              selectedrow: $variables.selecedAcceptance,
            },
          });

        }
      } catch (error) {
        const errorMessage = error?.message ||
    error?.body?.detail ||
    error?.body?.message||
      "Unknown API Error";

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-reservations',
            'R_USER_NAME': $application.user.username,
          },
          body: {
         "p_api_name": 'postEQPRite_AcceptBulkItems',
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

  return acceptRequestbuttonActionChain;
});
