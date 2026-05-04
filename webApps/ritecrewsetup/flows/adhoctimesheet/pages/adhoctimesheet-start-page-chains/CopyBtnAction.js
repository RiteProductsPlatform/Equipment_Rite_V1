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

  class CopyBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.rowdata.batch_id',
        ],
      });

      $variables.rowdata.batch_id = $variables.ManualTimesheetADP.data.length + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.ManualTimesheetADP,
        add: {
          data: $variables.rowdata,
        },
      });

      const setBatchIdDesc = await $functions.setBatchIdDesc(JSON.stringify($variables.ManualTimesheetADP.data));

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.ManualTimesheetADP.data',
        ],
      });

      $variables.ManualTimesheetADP.data = setBatchIdDesc;
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',
        uriParams: {
          'p_rate_schedule_name': $page.variables.rowdata.rate_schedule_name,
        },
      });

      $variables.crewHoursTypeCost = response.body.items;

      const timesheetdlgClose = await Actions.callComponentMethod(context, {
        selector: '#timesheetdlg',
        method: 'close',
      });
    }
  }

  return CopyBtnAction;
});
