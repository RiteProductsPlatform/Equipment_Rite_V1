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

  class SearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpTimeEntrySearch',
        uriParams: {
          'eqp_request_number': $variables.searchobj.requestnumber ? $variables.searchobj.requestnumber : "",
          'equipment_cart_number': $variables.cartNumber,
          'p_crew_week': $variables.searchobj.dateRange1 ? $variables.searchobj.dateRange1 : "",
          'p_customer': $variables.searchobj.customerval ? $variables.searchobj.customerval : "",
          'p_equipment_name': $variables.searchobj.equipmentName ? $variables.searchobj.equipmentName : "",
          'p_equipment_type': $variables.searchobj.equipmentType ? $variables.searchobj.equipmentType : "",
          'p_project_number': $variables.searchobj.project ?$variables.searchobj.project:"",
        },
      });

      $variables.projectBasedTimesheetADP.data = response.body.items;
    }
  }

  return SearchButtonActionChain;
});
