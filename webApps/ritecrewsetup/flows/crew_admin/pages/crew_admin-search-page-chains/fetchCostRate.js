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

  class fetchCostRate extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      //  debugger;
      $variables.currentPage = $variables.pagetype;

    

      const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'getContractSummary/getEQUIPMENT_RITEEQP_MAINTENANCECOSTDETAILS1_0GetMaintenanceCostDetails2',
            uriParams: {
              'p_asset_number': $variables.RowData.maintenance_asset_number,
            },
          });



          $variables.workordercostArray = response.body.items;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'getContractSummary/getEQUIPMENT_RITEEQP_FA_COSTDETAILS1_0GetEQPFACostDetails2',
            uriParams: {
              'p_asset_number': $variables.RowData.maintenance_asset_number,
            },
          });

          $variables.FACostArray = response2.body.items;
        },
      ].map(sequence => sequence()));
    }
  }

  return fetchCostRate;
});
