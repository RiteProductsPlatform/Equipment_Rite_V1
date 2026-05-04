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

  class CopyCurrentRowDataAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.rowdata = current.row;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.rowdata.cost',
    '$page.variables.rowdata.hour_type',
  ],
      });

      const timesheetdlgOpen = await Actions.callComponentMethod(context, {
        selector: '#timesheetdlg',
        method: 'open',
      });
    }
  }

  return CopyCurrentRowDataAction;
});
