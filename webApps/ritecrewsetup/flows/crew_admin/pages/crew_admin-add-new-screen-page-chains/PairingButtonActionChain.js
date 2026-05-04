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

  class PairingButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEquipmentLOV',
      });

      if (response.ok) {
        

       const result = await $functions.addUniqId(response.body.items);

        $variables.eqpPairingAdp.data = result;

        const pairingOpen = await Actions.callComponentMethod(context, {
          selector: '#pairing',
          method: 'open',
        });
      }
    }
  }

  return PairingButtonActionChain;
});
