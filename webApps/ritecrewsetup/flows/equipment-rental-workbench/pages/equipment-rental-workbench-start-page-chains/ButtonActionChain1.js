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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.selectedRequestedNumber',
    '$page.variables.selectedPartyName',
    '$page.variables.selectedPartyNumber',
    '$page.variables.selectedContract',
    '$page.variables.selectedEqpClass',
    '$page.variables.selectedEqpName',
    '$page.variables.tableData',
  ],
      });
    }
  }

  return ButtonActionChain1;
});
