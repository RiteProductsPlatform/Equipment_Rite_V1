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

  class ClassTblBeforeRowEdit extends ActionChain {

    async run(context, { event, accept, rowContext, rowKey, rowIndex, rowData }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.ClassSettingsTblRowData = rowData;
      // $variables.ClassSettingsTblRowData.inspection_site_check_in = rowData.inspection_site_check_in === 'Y' ? true : false;
      // $variables.ClassSettingsTblRowData.inspection_yard_check_in = rowData.inspection_yard_check_in === 'Y' ? true : false;
      // $variables.ClassSettingsTblRowData.inspection_yard_check_out = rowData.inspection_yard_check_out === 'Y' ? true : false;


    }
  }

  return ClassTblBeforeRowEdit;
});
