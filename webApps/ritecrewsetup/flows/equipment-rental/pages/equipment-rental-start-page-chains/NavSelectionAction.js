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

  class NavSelectionAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.selection 
     * @param {any} params.data 
     */
    async run(context, { selection, data }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const toEquipmentRentalDetails = await Actions.navigateToPage(context, {
        page: 'equipment-rental-details',
      });
    }
  }

  return NavSelectionAction;
});
