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

  class CreatePageNavigationAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toCrewAdminAddNewScreen = await Actions.navigateToPage(context, {
        page: 'crew_admin-add-new-screen',
      });
    }
  }

  return CreatePageNavigationAction;
});
