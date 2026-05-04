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

  class ButtonActionChain4 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.selectedParams',
    '$page.variables.showSearchParams',
    '$page.variables.selectedParams.crewNameId',
    '$page.variables.selectedParams.projectNameId',
    '$page.variables.selectedParams.taskNameId',
    '$page.variables.scheduleMainADP',
  ],
      });
    }
  }

  return ButtonActionChain4;
});
