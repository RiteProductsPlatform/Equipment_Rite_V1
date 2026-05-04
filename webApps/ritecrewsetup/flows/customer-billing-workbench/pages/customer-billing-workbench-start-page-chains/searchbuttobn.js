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

  class searchbuttobn extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
debugger;
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRent_BillingWorkbench',
        uriParams: {
          'p_reservation_number': $variables.headerobj.reservation_number?$variables.headerobj.reservation_number:"",
          'p_equipment_name': $variables.headerobj.eqpname?$variables.headerobj.eqpname:"",
          'p_contract_number': $variables.headerobj.contract?$variables.headerobj.contract:"",
        },
      });

      $variables.tableData.data = response.body.items;

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.tableData,
      });
    }
  }

  return searchbuttobn;
});
