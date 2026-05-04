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

  class TableFirstSelectedRowChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {any} params.rowData 
     */
    async run(context, { rowKey, rowData }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      // debugger;
     
      if(rowData){
      $variables.selectionrow = rowData;
      if(rowData.status==="IN_PROCESS"){
        $variables.isBtbVisible = true;
      }
      else{
          $variables.isBtbVisible = false;
      }
      }
      else{
         $variables.isBtbVisible = false;
      }






    }
  }

  return TableFirstSelectedRowChangeChain1;
});
