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

  class SubstituteButtonActionChain extends ActionChain {

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
       const result=  await $functions.addUniqId(response.body.items);

        $variables.eqpSubstituteAdp.data = result;
      }



      const substituteOpen = await Actions.callComponentMethod(context, {
        selector: '#Substitute',
        method: 'open',
      });
    }
  }

  return SubstituteButtonActionChain;
});
