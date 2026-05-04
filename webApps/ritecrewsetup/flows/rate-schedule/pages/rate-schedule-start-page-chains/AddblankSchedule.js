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

  class AddblankSchedule extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.scheduleBlankRow',
    '$page.variables.scheduleBlankRowData',
  ],
      });

      if (!$variables.scheduleTblADP.data.length > 0) {
        $page.variables.scheduleBlankRow.hour_type = 'Usage';
      }

      await Actions.fireDataProviderEvent(context, {
        target: $variables.scheduleTblADP,
        add: {
          data: $variables.scheduleBlankRow,
        },
      });
    }
  }

  return AddblankSchedule;
});
