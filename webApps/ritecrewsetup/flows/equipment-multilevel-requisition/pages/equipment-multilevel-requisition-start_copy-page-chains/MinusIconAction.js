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

  class MinusIconAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.currentObj 
     */
    async run(context, { currentObj }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.CartObj',
        ],
      });

      $variables.CartObj = currentObj;

      
   
      $variables.CartObj.equip_req_quantity = currentObj.equip_req_quantity >= 1 ? currentObj.equip_req_quantity-1 : 0;
    
     // $variables.CartObj.onhand_availability = $variables.CartObj.onhand_availability + 1;
      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentADP,
        update: {
          data: $variables.CartObj,
        },
      });
    }
  }

  return MinusIconAction;
});
