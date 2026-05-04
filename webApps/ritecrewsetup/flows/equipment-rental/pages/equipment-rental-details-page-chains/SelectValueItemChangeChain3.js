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

  class SelectValueItemChangeChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      
      $variables.equipmentName = data.equipment_class;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/Rent_EquipmentNames',
        uriParams: {
          'p_equipment_name': $variables.equipmentName,
        },
      });
          if (!response.ok) {
      
        return;
      } else {
        $flow.variables.syncCartArray = response.body.items;

          $variables.EquipmentADP.data = response.body.items;
      }
    }
  }

  return SelectValueItemChangeChain3;
});
