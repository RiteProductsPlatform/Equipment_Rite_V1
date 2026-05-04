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

  class fetchEquipments extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      if ($variables.searchVar) {

        const response2 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetEquipmentNames',
          headers: {
            'p_equipment_resource_class': $variables.searchVar ? $variables.searchVar : "",
            'p_end_date': $variables.enddate ? $functions.formatDate($variables.enddate) : "",
            'p_start_date': $variables.startdate ? $functions.formatDate($variables.startdate) : "",
          },
          uriParams: {
            'p_equipment_resource_class': $variables.searchVar,
            'p_end_date': $variables.enddate ? $functions.formatDate($variables.enddate) : "",
            'p_start_date': $variables.startdate ? $functions.formatDate($variables.startdate) : "",
          },
        });

        if (response.ok) {
          if (response.body.items.length > 0) {
            const uniqRecords = await $functions.getUniqueEquipments(response.body.items, response2.body.items);
            // debugger
            $variables.equipmentADP.data = uniqRecords;
          } else {

            await Actions.resetVariables(context, {
              variables: [
    '$variables.equipmentADP.data',
  ],
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'No Equipment Available for Selected Class',
              displayMode: 'transient',
              type: 'info',
            });

          }
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Fetch Equipment master',
            displayMode: 'transient',
          });
        }
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Equipment Class',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return fetchEquipments;
});
