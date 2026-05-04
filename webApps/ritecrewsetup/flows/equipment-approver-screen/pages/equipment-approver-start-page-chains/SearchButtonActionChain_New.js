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

  class SearchButtonActionChain_New extends ActionChain {

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
    '$variables.approverMainTableADP.data',
    '$variables.datesArray',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpSubmitTimeEntry2',
        uriParams: {
          'p_equipment_resource_class': $page.variables.searchobj.equipmentType ? $page.variables.searchobj.equipmentType : '',
          'p_equipment_name': $page.variables.searchobj.equipmentName ? $page.variables.searchobj.equipmentName : '',
          'p_project_name': $page.variables.searchobj.project ? $page.variables.searchobj.project : '',
          'p_crew_week': $page.variables.searchobj.dateRange ? $page.variables.searchobj.dateRange : '',
          'p_eqp_request_number': $page.variables.searchobj.requestNumber ? $page.variables.searchobj.requestNumber : '',
        },
      });

      if (response.ok) {
        if (response.body.items.length >= 1) {
          $variables.approverMainTableADP.data = response.body.items;
          if ($variables.searchobj.dateRange) {
            const weekDateArray = await $functions.getWeekDateArray($variables.searchobj.dateRange, undefined, true);
            $variables.datesArray = weekDateArray;
          }







        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'No Data For Selected Input Parameters',
            type: 'info',
            displayMode: 'transient',
          });

        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Fetch Data',
          type: 'error',
          displayMode: 'transient',
        });

      }
    }
  }

  return SearchButtonActionChain_New;
});
