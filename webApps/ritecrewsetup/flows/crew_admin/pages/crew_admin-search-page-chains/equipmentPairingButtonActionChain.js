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

  class equipmentPairingButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if ($variables.RowData.equipment_id) {

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getEQPRite_SuggestionDetails',
          uriParams: {
            'p_parent_equipment_id': $variables.RowData.equipment_id,
          },
        });

        if (response.ok) {
          
          $variables.eqpPairingAdp.data = response.body.items;
        }

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetEquipmentLOV',
        });
if(response2.ok){
         const data = await $functions.addUniqId(response2.body.items);

        if(data){
            $variables.equipmentPairingAdp.data = data;


        }
}
        const pairingClose = await Actions.callComponentMethod(context, {
          selector: '#pairing',
          method: 'open',
        });
      }
    }
  }

  return equipmentPairingButtonActionChain;
});
