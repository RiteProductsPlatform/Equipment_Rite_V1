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

      $variables.currentPage = $variables.pagetype;
      const response1 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRent_EqupDetails',
        uriParams: {
          'p_equipment_name': $application.variables.eqpname,
        },
      });

      $variables.RowData = response1.body.items[0];
debugger;

      const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/AssetMaintCost',
            uriParams: {
              'p_asset_number': $variables.RowData.asset_number,
            },
          });

          $variables.workordercostArray = response.body.items;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/AssetFACost',
            uriParams: {
              'p_asset_number': $variables.RowData.asset_number,
            },
          });

          $variables.FACostArray = response2.body.items;
        },
      ].map(sequence => sequence()));
    }
  }

  return fetchCostRate;
});
