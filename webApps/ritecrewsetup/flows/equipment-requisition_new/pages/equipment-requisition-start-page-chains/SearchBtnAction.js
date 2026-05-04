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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $eq, $variables } = context;

      const validateGroup = await $application.functions.validateGroup('searchgroup');

      if (validateGroup === 'valid') {
            const callRestTimeRiteOrdsServiceGetGetEquipmentNamesResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEquipmentNames',
        uriParams: {
          'p_start_date': $variables.SearchObj.StartDate,
          'p_equipment_resource_class': $variables.SearchObj.EquipmentClass,
          'p_equipment_name': $variables.SearchObj.EquipmentId ? $variables.SearchObj.EquipmentId: "",
          'p_end_date': $variables.SearchObj.EndDate,
        },
      });

      if (callRestTimeRiteOrdsServiceGetGetEquipmentNamesResult.ok) {

         $page.variables.equipmentADP.data = callRestTimeRiteOrdsServiceGetGetEquipmentNamesResult.body.items;
          $variables.istableenable = 'Data';
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Requisition Details',
          displayMode: 'transient',
        });
        
      }
    }
    }
  }

  return SearchBtnAction;
});
