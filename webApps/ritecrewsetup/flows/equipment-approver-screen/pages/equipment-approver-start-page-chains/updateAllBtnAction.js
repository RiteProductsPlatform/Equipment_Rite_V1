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

  class updateAllBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.EditType = 'UPDATE';
      $page.variables.updateTimeSheet.mon_in_time = '08:00';
      $page.variables.updateTimeSheet.tue_in_time = '08:00';
      $page.variables.updateTimeSheet.wed_in_time = '08:00';
      $page.variables.updateTimeSheet.thu_in_time = '08:00';
      $page.variables.updateTimeSheet.fri_in_time = '08:00';
      $page.variables.updateTimeSheet.sat_in_time = '00:00';
      $page.variables.updateTimeSheet.sun_in_time = '00:00';
      $page.variables.updateTimeSheet.mon_out_time = '16:00';
      $page.variables.updateTimeSheet.tue_out_time = '16:00';
      $page.variables.updateTimeSheet.wed_out_time = '16:00';
      $page.variables.updateTimeSheet.thu_out_time = '16:00';
      $page.variables.updateTimeSheet.fri_out_time = '16:00';
      $page.variables.updateTimeSheet.sat_out_time = '00:00';
      $page.variables.updateTimeSheet.sun_out_time = '00:00';

      const callComponentMethodTimesDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'open',
      });
    }
  }

  return updateAllBtnAction;
});
