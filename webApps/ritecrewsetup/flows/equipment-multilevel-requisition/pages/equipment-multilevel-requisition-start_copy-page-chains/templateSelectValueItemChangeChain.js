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

  class templateSelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.equipmentADP.data',
  ],
      });

      if (data) {
$variables.searchObj.template_id = data.template_id;
      

      

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_CRTemplateLines',
        uriParams: {
          'p_template_id': data.template_id,
        },
      });

      if (response.ok) {
        if (response.body.items.length>0) {

          const enrichEquipmentArray = await $functions.enrichEquipmentArray(response.body.items);
          $variables.equipmentADP.data = enrichEquipmentArray;
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'No equipment records were found',
            type: 'info',
            displayMode: 'transient',
          });
          
        }
        
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Fetch Equipments',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
      }
    }
  }

  return templateSelectValueItemChangeChain;
});
