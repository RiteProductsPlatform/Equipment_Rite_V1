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

  class resetActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.eqClass',
    '$page.variables.eqpName',
    '$page.variables.projectName',
    '$page.variables.customer_name',
    '$page.variables.reqName',
    '$page.variables.status',
    '$page.variables.projectNumber',
    '$page.variables.projectId',
    '$page.variables.tableADP',
    '$page.variables.tableADP.data',
  ],
      });
    }
  }

  return resetActionChain;
});
