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

      const results = await Promise.all([
        async () => {

          $variables.selectionrow = rowData;
          // $variables.projExpenseObj.quantity=rowData.equip_req_quantity;
          // $variables.projExpenseObj.expenditureType=rowData.expenditure_type;
          // $variables.projExpenseObj.originalTransactionReference = rowData.batchname;
          $variables.projExpenseObj.nonlaborResource=rowData.non_labor_resource;
        },
        async () => {
// debugger;
          const response = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05FinBusinessUnitsLOV',
          });
        },
      ].map(sequence => sequence()));
    }
  }

  return TableFirstSelectedRowChangeChain1;
});
