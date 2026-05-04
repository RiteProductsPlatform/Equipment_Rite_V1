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

  class EditiconClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      $page.variables.projectBasedRowData = current.row;
    
      $page.variables.EditType = 'Edit';
      $page.variables.Dialoguelabel = 'Edit';
      $page.variables.projectBasedRowData.fri_usage = current.row.fri_quantity;
      $page.variables.projectBasedRowData.mon_usage = current.row.mon_quantity;
      $page.variables.projectBasedRowData.sat_usage = current.row.sat_quantity;
      $page.variables.projectBasedRowData.sun_usage = current.row.sun_quantity;
      $page.variables.projectBasedRowData.thu_usage = current.row.thu_quantity;
      $page.variables.projectBasedRowData.tue_usage = current.row.tue_quantity;
      $page.variables.projectBasedRowData.wed_usage = current.row.wed_quantity;

      const callComponentMethodTimesDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'open',
      });
    }
  }

  return EditiconClickAction;
});
