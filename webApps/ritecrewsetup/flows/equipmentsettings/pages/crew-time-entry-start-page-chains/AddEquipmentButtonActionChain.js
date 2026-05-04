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

  class AddEquipmentButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

  //     await Actions.resetVariables(context, {
  //       variables: [
  //   '$variables.templatepopup',
  // ],
  //     });

     $variables.templatepopup_copy
        .p_equipment_id
        = $page.variables.templateAdp
          .data.length === 0 ? 1
          : Math.max(...$page.variables.templateAdp
            .data.map(obj => obj.p_equipment_id)) + 1;
 
 
 
 
      await Actions.fireDataProviderEvent(context, {
        target: $variables.templateAdp
        ,
        add: {
          data: $variables.templatepopup_copy
          ,
          keys: $variables.templatepopup_copy
            .p_equipment_id,
        },
      });

    }
  }

  return AddEquipmentButtonActionChain;
});
