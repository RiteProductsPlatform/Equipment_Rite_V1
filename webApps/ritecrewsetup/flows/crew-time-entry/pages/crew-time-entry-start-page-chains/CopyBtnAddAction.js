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

  class CopyBtnAddAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      debugger;
      // await Actions.resetVariables(context, {
      //   variables: [
      //     '$page.variables.projectBasedRowData.crewsetup_eqp_header_id',
      //   ],
      // });

      const maxheaderid = await $functions.getmaxheaderid(JSON.stringify($variables.projectBasedTimesheetADP.data));
      $variables.projectBasedRowData.iscopy = true;
      $variables.projectBasedRowData.crewsetup_eqp_header_id = maxheaderid;
      $variables.projectBasedRowData.equipment_request_id = $variables.projectBasedTimesheetADP.data.length + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.projectBasedTimesheetADP,
        add: {
          data: $variables.projectBasedRowData,
        },
      });

      // await Actions.fireDataProviderEvent(context, {
      //   target: $variables.projectBasedTimesheetADP,
      //   refresh: null,
      // });

      const timesDialogClose = await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'close',
      });
    }
  }

  return CopyBtnAddAction;
});
