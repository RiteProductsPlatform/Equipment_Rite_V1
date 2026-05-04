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

  class FetchNames extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/Rent_EquipmentNames',
        uriParams: {
          'p_equipment_name': $variables.equipmentName,
        },
      });

      if (!response.ok) {
      
        return;
      } else {
          $variables.EquipmentADP.data = response.body.items;
      }

    }
  }

  return FetchNames;
});
