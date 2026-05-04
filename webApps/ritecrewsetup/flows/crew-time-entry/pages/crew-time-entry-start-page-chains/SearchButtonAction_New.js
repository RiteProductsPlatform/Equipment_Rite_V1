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

  class SearchButtonAction_New extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.projectBasedTimesheetADP.data',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpTimeEntrySearch',
        uriParams: {
          'p_crew_week': $variables.searchobj.dateRange1?$variables.searchobj.dateRange1:"",
          'eqp_request_number': $variables.searchobj.requestnumber ? $variables.searchobj.requestnumber : "",
          'equipment_cart_number': $variables.cartNumber?$variables.cartNumber:"",
          'p_crewsetup_id': $variables.searchobj.crewSetup_id ? $variables.searchobj.crewSetup_id:"",
          'p_customer': $variables.searchobj.customerval?$variables.searchobj.customerval:"",
          'p_equipment_name': $variables.searchobj.equipmentName ? $variables.searchobj.equipmentName:"",
          'p_equipment_type': $variables.searchobj.equipmentType ? $variables.searchobj.equipmentType:"",
          'p_project_number': $variables.searchobj.project ? $variables.searchobj.project:"",
          'p_equipment_resource_class': $variables.searchobj.eqClass ? $variables.searchobj.eqClass:"" ,
        },
      });

      if (response.ok) {

        if (response.body.items.length>=1) {

          if ($variables.searchobj.dateRange1) {

            const weekDateArray = await $functions.getWeekDateArray($variables.searchobj.dateRange1, undefined, true);
 
            $variables.datesArray = weekDateArray;
          }
     

          const adjustQuantities = await $functions.adjustQuantities(response.body.items, $variables.searchobj.dateRange1);
          const result = await $functions.addUniqId(adjustQuantities);

          $variables.projectBasedTimesheetADP.data = result;
        } else {
           await Actions.fireNotificationEvent(context, {
             summary: 'No data is available for the selected input parameters.',
             type: 'info',
             displayMode: 'transient',
           });
        }
      }
      // else{
        
      // }
    }
  }

  return SearchButtonAction_New;
});
