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

  class PlusiconAction extends ActionChain {

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

      if (currentObj.onhand_availability) {
        $variables.CartObj = currentObj;

        if ($variables.currentQuantity < currentObj.onhand_availability) {
          $variables.currentQuantity = $variables.currentQuantity ? $variables.currentQuantity + 1 : 1;
          $variables.CartObj.equip_req_quantity = $variables.currentQuantity;
          await Actions.fireDataProviderEvent(context, {
            target: $variables.equipmentADP,
            update: {
              data: $variables.CartObj,
            },
          });

          await Actions.fireDataProviderEvent(context, {
            target: $variables.equipmentADP,
            refresh: null,
          });
        }
      }





    }
  }

  return PlusiconAction;
});
