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

  class ContractValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/Contracts',
        uriParams: {
          'contract_id': data.contract_id,
        },
      });

      const contId= await $functions.extractContractId(JSON.stringify(response.body.links));

      $variables.contractid = contId;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.childBillPlanListSDP,
        refresh: null,
      });
    }
  }

  return ContractValueChangeAction;
});
