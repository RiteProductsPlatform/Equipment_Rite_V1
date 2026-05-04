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

  class ResetButton extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.masterSearchObj',
    '$page.variables.equipmentMasterTable',
    '$page.variables.businessUnit',
    '$page.variables.assetOrg',
    '$page.variables.eqpClass',
    '$variables.asset',
  ],
      });
    }
  }

  return ResetButton;
});
