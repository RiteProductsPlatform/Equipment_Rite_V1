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

  class BackBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.actionId 
     */
    async run(context, { actionId }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // const toCrewAdmin = await Actions.navigateToFlow(context, {
      //   target: 'parent',
      //   flow: 'crew_admin',
      //   page: 'crew_admin-start',
      // });

      await Actions.navigateBack(context, {
      });
    }
  }

  return BackBtnAction;
});
