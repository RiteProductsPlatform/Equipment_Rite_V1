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

  class EquipmentsubstituteSaveButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // if ($variables.equipmentsubstitutekey) {
      //   if ($variables.equipmentsubstitutekey.keys.keys.size > 0) {
      //     await Actions.fireNotificationEvent(context, {
      //       summary: 'Equipment substitute Data Saved',
      //       type: 'info',
      //       displayMode: 'transient',
      //     });

      //     const eqpSubstituteClose = await Actions.callComponentMethod(context, {
      //       selector: '#eqpSubstitute',
      //       method: 'close',
      //     });

      //   } else {
      //     await Actions.fireNotificationEvent(context, {
      //       type: 'error',
      //       displayMode: 'transient',
      //       summary: 'Kindly Select Records To Save The Data',
      //     });
      //   }
      // } else {
      //   await Actions.fireNotificationEvent(context, {
      //     type: 'error',
      //     displayMode: 'transient',
      //     summary: 'Kindly Select Records To Save The Data',
      //   });
      // }

      if ($variables.editSubstituteADP.data) {
        if ($variables.editSubstituteADP.data.length > 0) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Equipment Substitute Data Saved Successfully',
            displayMode: 'transient',
            type: 'info',
          });

          const eqpSubstituteClose2 = await Actions.callComponentMethod(context, {
            selector: '#eqpSubstitute',
            method: 'close',
          });

        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'No Records Found to Proceed',
            displayMode: 'transient',
            type: 'error',
          });
        }

      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'No Records Found to Proceed',
          type: 'error',
          displayMode: 'transient',
        });

      }



    }
  }

  return EquipmentsubstituteSaveButtonActionChain1;
});
