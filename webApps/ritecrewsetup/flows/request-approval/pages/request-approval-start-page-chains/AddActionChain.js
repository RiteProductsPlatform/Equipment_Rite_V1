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

  class AddActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;


      // debugger;

      $variables.editEquVar_copy.id = $variables.equpADP.data.length ===0?1:$variables.equpADP.data.length + 1;

      $variables.editEquVar_copy.p_equipment_name = $variables.currentRow.equipment_name?$variables.currentRow.equipment_name:'';

      await Actions.fireDataProviderEvent(context, {
        target: $variables.equpADP,
        add: {
          data: $variables.editEquVar_copy,
          keys: $variables.editEquVar_copy.id,
        },
      });


      
    }
  }

  return AddActionChain;
});
