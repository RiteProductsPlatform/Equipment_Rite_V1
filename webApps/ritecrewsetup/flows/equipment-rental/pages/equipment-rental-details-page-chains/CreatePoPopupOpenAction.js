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

  class CreatePoPopupOpenAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.actionId 
     */
    async run(context, { actionId }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toEquipmentRentalStart = await Actions.navigateToPage(context, {
        page: 'equipment-rental-start',
      });

  //     await Actions.resetVariables(context, {
  //       variables: [
  //   '$page.variables.CreatePoObj',
  // ],
  //     });

  //     const poDlgOpen = await Actions.callComponentMethod(context, {
  //       selector: '#poDlg',
  //       method: 'open',
  //     });
    }
  }

  return CreatePoPopupOpenAction;
});
