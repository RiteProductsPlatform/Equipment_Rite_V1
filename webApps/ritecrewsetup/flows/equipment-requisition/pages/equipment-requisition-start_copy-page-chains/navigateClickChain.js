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

  class navigateClickChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;

     

        $application.variables.equvariables = $variables.selectedRow;

      const toEquipmentRequisitionNewScreen = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'equipment-requisition-new-screen',
      });
    }
  }

  return navigateClickChain;
});
