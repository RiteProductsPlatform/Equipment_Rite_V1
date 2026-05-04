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

  class ButtonActionChain11 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$variables.requestObj',
          '$variables.equpADP',
        ],
      });

      $variables.editEquVar_copy.id = $variables.equpADP.data.length === 0 ? 1 : $variables.equpADP.data.length + 1;

      $variables.editEquVar_copy.p_equipment_name = $variables.currentRow.equipment_name ? $variables.currentRow.equipment_name : '';
      $variables.editEquVar_copy.p_equip_req_quantity
        = $variables.currentRow.equip_req_quantity ? $variables.currentRow.equip_req_quantity : '';
      $variables.editEquVar_copy.p_notes
 = $variables.currentRow.comments ? $variables.currentRow.comments : '';
 
  $variables.editEquVar_copy.p_total_efforts_perday
 =$variables.currentRow.total_efforts_perday ? $variables.currentRow.total_efforts_perday:"";

 

      // debugger;
      await Actions.fireDataProviderEvent(context, {
        target: $variables.equpADP,
        add: {
          data: $variables.editEquVar_copy,
          keys: $variables.editEquVar_copy.id,
        },
      });



      const editDailogOpen = await Actions.callComponentMethod(context, {
        selector: '#EditDailog',
        method: 'open',
      });
    }
  }

  return ButtonActionChain11;
});
