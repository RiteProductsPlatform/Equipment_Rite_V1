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

  class ResetbtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.headerObj',
    '$page.variables.ManualTimesheetADP.data',
    '$page.variables.columns',
    '$variables.headerObj.date',
    '$page.variables.taskObj',
    '$page.variables.taskTblADP.data',
    '$page.variables.taskNum',
    '$variables.date',
  ],
      });
    }
  }

  return ResetbtnAction;
});
