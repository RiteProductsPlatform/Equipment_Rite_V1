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

  class postRawCostSwitchValueChangeActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {boolean} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     */
    async run(context, { event, previousValue, value, updatedFrom }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (value) {
        await Actions.resetVariables(context, {
          variables: [
    '$variables.projExpenseObj.quantity',
    '$variables.projExpenseObj.originalTransactionReference',
    '$variables.projExpenseObj.expenditureTypeId1',
    '$variables.projExpenseObj.expenditureTypeName1',
    '$variables.projExpenseObj.comments',
    '$variables.projExpenseObj.org1',
  ],
        });
        
      }else{
        await Actions.resetVariables(context, {
          variables: [
    '$variables.projExpenseObj.expenditureType',
    '$variables.projExpenseObj.expenditureTypeId',
    '$variables.projExpenseObj.currency',
    '$variables.projExpenseObj.rawcost',
    '$variables.projExpenseObj.originalTransactionReference',
    '$variables.projExpenseObj.quantity',
    '$variables.projExpenseObj.comments',
     '$variables.projExpenseObj.org',
  ],
        });

      }
    }
  }

  return postRawCostSwitchValueChangeActionChain;
});
