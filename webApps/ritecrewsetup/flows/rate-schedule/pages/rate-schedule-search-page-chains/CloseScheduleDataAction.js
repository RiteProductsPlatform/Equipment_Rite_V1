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

  class CloseScheduleDataAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.scheduleRowData',
  ],
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.getRateScheduleByNameListSDP2,
        refresh: null,
      });

      const editscheduleClose = await Actions.callComponentMethod(context, {
        selector: '#editschedule',
        method: 'close',
      });
    }
  }

  return CloseScheduleDataAction;
});
