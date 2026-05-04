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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.name 
     */
    async run(context, { name = 'current.data.equipment_name' }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toEquipmentRentalSearch = await Actions.navigateToPage(context, {
        page: 'equipment-rental-search',
        params: {
          pagetype: 'Create',
        },
        history: 'push',
      });

      $application.variables.eqpname = name;
    }
  }

  return ButtonActionChain;
});
