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

  class addEquipmentSwitchValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {boolean} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     */
    async run(context, { event, previousValue, value, updatedFrom }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.equipmentADP.data',
  ],
      });

      if (value) {

        await Actions.resetVariables(context, {
          variables: [
    '$variables.searchObj.template_name',
  ],
        });

        $variables.isAddEquipment = 'Y';
      }else{

        await Actions.resetVariables(context, {
          variables: [
    '$variables.searchVar',
  ],
        });

        $variables.isAddEquipment = 'N';
        
      }
    }
  }

  return addEquipmentSwitchValueChangeChain;
});
