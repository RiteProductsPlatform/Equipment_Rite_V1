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

  class EquipmentSubstiuteButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_SubstituteDetails',
        uriParams: {
          'p_parent_equipment_id': $variables.RowData.equipment_id,
        },
      });

      if (response.ok) {
 $variables.eqpSubstituteAdp.data = response.body.items;
      }

     

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEquipmentLOV',
      });

      if (response2.ok) {

       const result =  await $functions.addUniqId(response2.body.items);

        $variables.equipmentSubsituteAdp.data =result;
      }

      const eqpSubstituteOpen = await Actions.callComponentMethod(context, {
        selector: '#eqpSubstitute',
        method: 'open',
      });
    }
  }

  return EquipmentSubstiuteButtonActionChain;
});
