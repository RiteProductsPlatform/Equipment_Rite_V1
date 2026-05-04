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

  class PrimaryBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.pagetype === "Create") {
        const toCrewAdmin = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'crew_admin',
          page: 'crew_admin-add-new-screen',
        });

      } else if ($variables.pagetype === "Save") {

      } else {
        const toEquipmentRequisition = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'equipment-requisition',
          page: 'equipment-requisition-start',
        });
      }

    }
  }

  return PrimaryBtnAction;
});
