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

  class BillPlanValueChange extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const billplanstring = await $functions.getbillplanstring(JSON.stringify(data.links));

      $variables.billplanId = billplanstring;

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/ChildNonLaborRateOverrideBybillPlan',
        uriParams: {
          'bilplan_id': billplanstring,
          'contract_id': $variables.contractid,
        },
      });

      const nonLabourstring = await $functions.getNonLabourstring(JSON.stringify(response.body.items[0].links));

      $variables.billRateVar = response.body.items[0].Rate;
      $variables.glID = nonLabourstring;
    }
  }

  return BillPlanValueChange;
});
