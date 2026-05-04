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

  class CloseScheduleDetailsAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.ScheduleDetailsRowData',
  ],
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.getRateScheduleDetailsbyNameListSDP,
        refresh: null,
      });

      const editscheduledetailsClose = await Actions.callComponentMethod(context, {
        selector: '#editscheduledetails',
        method: 'close',
      });
    }
  }

  return CloseScheduleDetailsAction;
});
