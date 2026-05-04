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

  class ButtonActionChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {string} params.name
     */
    async run(context, { event, originalEvent, name }) {
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

  return ButtonActionChain3;
});
