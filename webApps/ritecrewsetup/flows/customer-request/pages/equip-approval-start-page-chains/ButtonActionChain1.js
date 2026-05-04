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
    '$page.variables.eqpName',
    '$page.variables.tableADP',
    '$page.variables.project_name_var',
    '$page.variables.eqpClass',
  ],
      });
    }
  }

  return ButtonActionChain1;
});
