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

  class TableSelectedChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.keys 
     * @param {any} params.selected 
     */
    async run(context, { keys, selected }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let checkfilterData = await $functions.checkfilterData(selected, $variables.DetailsTblADP.data, keys);

      $variables.eqpnums = checkfilterData;

      if ( $variables.eqpnums.length > Number($variables.selectionrow.equip_req_quantity) === true) {
          await Actions.fireNotificationEvent(context, {
            summary: "You Cant Select more than " +  $variables.selectionrow.quantity + " Equipments",
          });
        } else {
        
      }
    }
  }

  return TableSelectedChangeChain;
});
