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

  class eqpPairingSaveButtonActionChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;


      if ($variables.paringADP.data.length>0) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Equipment Paired Successfully',
          displayMode: 'transient',
          type: 'info',
        });

        const pairingClose2 = await Actions.callComponentMethod(context, {
          selector: '#pairing',
          method: 'close',
        });
        
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'No Data Found to Save',
          displayMode: 'transient',
          type: 'error',
        });
        
      }

      // if ($variables.selectedEqpPairKey) {
      //   if ($variables.selectedEqpPairKey.keys.keys.size > 0) {
      //     await Actions.fireNotificationEvent(context, {
      //       summary: 'Equipment Pair Data Saved',
      //       type: 'info',
      //       displayMode: 'transient',
      //     });

      //     const pairingClose = await Actions.callComponentMethod(context, {
      //       selector: '#pairing',
      //       method: 'close',
      //     });

      //   } else {
      //     await Actions.fireNotificationEvent(context, {
      //       type: 'error',
      //       displayMode: 'transient',
      //       summary: 'Kindly Select Records To Save The Data',
      //     });
      //   }
      // }else{
      //    await Actions.fireNotificationEvent(context, {
      //       type: 'error',
      //       displayMode: 'transient',
      //       summary: 'Kindly Select Records To Save The Data',
      //     });
      // }
    }
  }

  return eqpPairingSaveButtonActionChain3;
});
