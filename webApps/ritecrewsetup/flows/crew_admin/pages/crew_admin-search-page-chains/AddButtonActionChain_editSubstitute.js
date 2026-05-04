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

  class AddButtonActionChain_editSubstitute extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

  
// debugger;
    $variables.equipmentSubsitute.uid =$page.variables.editSubstituteADP.data.length === 0?1 : Math.max(...$page.variables.editSubstituteADP.data.map(obj => obj.uid)) + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.editSubstituteADP,
        add: {
          data: $variables.equipmentSubsitute_copy,
        },
      });
  
    }
  }

  return AddButtonActionChain_editSubstitute;
});
