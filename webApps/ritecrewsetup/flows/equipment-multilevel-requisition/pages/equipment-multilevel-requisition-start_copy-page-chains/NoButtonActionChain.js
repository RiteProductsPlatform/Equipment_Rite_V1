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

  class NoButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const frequentClose = await Actions.callComponentMethod(context, {
        selector: '#frequent',
        method: 'close',
      });

      //  if (true) {
       
      //   $variables.equplatitude = $variables.selectedRow.latitude;
      //   $variables.equplongitude= $variables.selectedRow.longitude;

      //   let currentRecord ={...$variables.selectedRow};
      //   if(!currentRecord.equip_req_quantity){
      //     currentRecord.equip_req_quantity= 1;
      //   }
      //   debugger;
      //   const cartAddition = await $functions.cartAddition(currentRecord, JSON.stringify($variables.CartArray));

      //   $variables.CartArray = cartAddition;

      //   await Actions.fireNotificationEvent(context, {
      //     summary: $variables.selectedRow.equipment_name +" "+ "has been added to Cart Successfully",
      //     displayMode: 'transient',
      //     type: 'info',
      //   });
      // }else{
      //   await Actions.fireNotificationEvent(context, {
      //     summary: 'Please select an Equipment Class to add the items to cart',
      //     displayMode: 'transient',
      //     type: 'info',
      //   });
        
      // }
    }
  }

  return NoButtonActionChain;
});
