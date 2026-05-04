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

  class TimeTblEditBeforeRowEdit extends ActionChain {
    
    async run(context, { cancelEdit, rowKey, rowIndex, rowData }) {
      const { $page, $flow, $application } = context;

     const editmarker =  await $page.functions.editRowMarker($page.variables.AddRowData, $page.variables.SearchRowdata);

      if (editmarker) {
        $page.variables.SearchRowdata.isRowEdited = true;

      } else {
        $page.variables.SearchRowdata.isRowEdited = false;
      }

      await Actions.fireDataProviderEvent(context, {
        target: $page.variables.AddTimeSheetADP,
        update: {
          data: $page.variables.SearchRowdata,
        },
      });
    }
  }

  return TimeTblEditBeforeRowEdit;
});
