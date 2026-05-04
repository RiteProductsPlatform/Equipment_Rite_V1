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

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;


      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRent_BillingWorkbench_RN',
      });

      const removeDuplicatesByReservationNumber = await $functions.removeDuplicatesByReservationNumber(response2.body.items);

      const removeDuplicatesBycontract = await $functions.removeDuplicatesBycontract(response2.body.items);

      $variables.reseAdp.data = removeDuplicatesByReservationNumber;

      $variables.contractAdp.data = removeDuplicatesBycontract;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRent_BillingWorkbench',
      });

      $variables.tableData.data = response.body.items;
    }
  }

  return vbEnterListener;
});
