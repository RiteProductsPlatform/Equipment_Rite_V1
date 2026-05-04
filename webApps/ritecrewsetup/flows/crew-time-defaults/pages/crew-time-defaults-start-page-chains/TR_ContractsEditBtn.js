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

  class TR_ContractsEditBtn extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.updateContracts',
        ],
      });

      const callComponentMethodEditContractDetailsOpenResult = await Actions.callComponentMethod(context, {
        selector: '#editContractDetails',
        method: 'open',
      });

      $page.variables.updateContracts = current;
      $page.variables.updateContracts.ot_allowed = current.ot_allowed === true ? true : false;
      $page.variables.updateContracts.active_flag = current.active_flag === true ? true : false;
      $page.variables.dialogLabel = 'Edit';
      $page.variables.defaultCheck = false;
    }
  }

  return TR_ContractsEditBtn;
});
