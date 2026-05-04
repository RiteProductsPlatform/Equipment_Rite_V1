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

  class eqpSubstituteSaveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      //       if ($variables.selectedKey) {

      //         if($variables.selectedKey.keys.keys.size>0){
      //           await Actions.fireNotificationEvent(context, {
      //             type: 'info',
      //             displayMode: 'transient',
      //             summary: 'Equipment Substitute Data Saved',
      //           });

      //           const substituteClose = await Actions.callComponentMethod(context, {
      //             selector: '#Substitute',
      //             method: 'close',
      //           });

      //         }else{
      //  await Actions.fireNotificationEvent(context, {
      //             type: 'error',
      //             displayMode: 'transient',
      //             summary: 'Kindly Select Records To Save The Data',
      //           });
      //         }
      //       }else{
      //          await Actions.fireNotificationEvent(context, {
      //             type: 'error',
      //             displayMode: 'transient',
      //             summary: 'Kindly Select Records To Save The Data',
      //           });
      //       }


      if ($variables.substituteADP.data) {
        if ($variables.substituteADP.data.length > 0) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Equipment Substitute Data Saved',
            displayMode: 'transient',
            type: 'info',
          });

          const substituteClose2 = await Actions.callComponentMethod(context, {
            selector: '#Substitute',
            method: 'close',
          });

        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'No Data Found to Proceed',
            displayMode: 'transient',
            type: 'error',
          });
          
        }
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'No Data Found to Proceed',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return eqpSubstituteSaveButtonActionChain;
});
