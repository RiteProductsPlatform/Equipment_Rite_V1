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

  class DownloadBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await $application.functions.csvdownload(JSON.stringify($variables.ManualTimesheetADP.data), 'Manual Timesheets.csv');
    }
  }

  return DownloadBtnAction;
});
