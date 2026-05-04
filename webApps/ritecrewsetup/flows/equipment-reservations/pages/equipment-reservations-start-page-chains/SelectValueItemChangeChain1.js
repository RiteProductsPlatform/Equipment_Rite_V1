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

  class SelectValueItemChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables , $functions} = context;

      $variables.eqClass = data.eqp_class_details;
      
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEquipmentNames',
        uriParams: {
          'p_equipment_resource_class': $variables.eqClass,
        },
      });

      const removeDuplicates = await $functions.removeDuplicates(response.body.items);

      $variables.equipname.data = removeDuplicates;
    }
  }

  return SelectValueItemChangeChain1;
});
