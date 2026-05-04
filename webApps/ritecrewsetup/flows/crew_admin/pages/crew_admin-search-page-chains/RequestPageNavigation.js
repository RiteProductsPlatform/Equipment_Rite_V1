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

  class RequestPageNavigation extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toEquipmentRequisition = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'equipment-requisition',
        page: 'equipment-requisition-start',
      });
    }
  }

  return RequestPageNavigation;
});
