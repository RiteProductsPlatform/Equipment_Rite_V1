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

  class FlexClickChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toEquipApproval = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'equip-approval',
      });

      $application.variables.isDashboard = true;
    }
  }

  return FlexClickChain2;
});
