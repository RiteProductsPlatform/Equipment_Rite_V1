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

  class PlusButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.equpvariable_copy.equipment_id = $variables.equipmentnewADP.data.length===0? 1 : $variables.equipmentnewADP.data.length + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentnewADP,
        add: {
          data: $variables.equpvariable_copy,
        },
      });
    }
  }

  return PlusButtonActionChain;
});
