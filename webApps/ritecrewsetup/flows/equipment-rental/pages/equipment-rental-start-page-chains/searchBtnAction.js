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

  class searchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
 
      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.EquipmentADP.data',
        ],
      });

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetRentalEquipmentClasses',
      });

      if (!response2.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Equipment Details',
        });

        return;
      }
      //  else {
      //   const unique = await $functions.getUniqueEquipments(JSON.stringify(response2.body.items));

      //   $variables.EquipmentADP.data = unique;
      // }
      $variables.EquipmentADP.data = response2.body.items;
      
     

      

    }
  }

  return searchBtnAction;
});
