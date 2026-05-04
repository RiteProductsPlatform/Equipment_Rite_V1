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

  class SearchButtonNewButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $eq, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.scheduleMainADP.data',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpSchEquipmentSearch',
        uriParams: {
          'p_requestor_name': $variables.requestor_name || "",
          'p_equipment_resource_class': $variables.selectedEquipmentClass || "",
          'p_project_id': $page.variables.selectedParams.projectNameId || "",
        },
        requestTransformOptions: {
          filter: {
            op: '$eq',
            attribute: 'equipment_name',
            value: $variables.selectedEquipmentName || "",
          },
        },
      });

      if (response.ok) {
        if (response.body.items.length>0) {
          

          $variables.scheduleMainADP.data = response.body.items;

          await $functions.alterResp(response.body.items);
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'No Data Found ',
            type: 'info',
            displayMode: 'transient',
          });

        }

      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Fetch The Data',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return SearchButtonNewButtonActionChain;
});
