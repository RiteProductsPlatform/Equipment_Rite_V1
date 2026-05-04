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

  class FetchMasterDetails extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEquipmentMaster',
        uriParams: {
          'p_asset_org': "",
          'p_eqp_class': "",
          'p_equipment_name': "",
        },
      });

     const piedata= await $functions.pieChartData(JSON.stringify(response.body.items));

      $variables.chartArray = piedata;
      $variables.EquipmentTblADP.data = response.body.items;
    }
  }

  return FetchMasterDetails;
});
