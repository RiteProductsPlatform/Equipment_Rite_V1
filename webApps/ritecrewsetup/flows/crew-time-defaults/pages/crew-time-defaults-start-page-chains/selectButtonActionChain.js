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

  class selectButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.localCustomerObj',
          '$page.variables.localCustomerObj_backup',
        ],
      });

      $page.variables.localCustomerObj = $page.variables.varCustomerADP.data.filter(i => i.CUSTOMER_ID == $page.variables.varLocalObj.customerId)[0];

     $page.variables.varLocalObj.searchCustomerName = $page.variables.localCustomerObj.CUSTOMER_NAME;


      $page.variables.varLocalObj_backup = $page.variables.localCustomerObj;


      const callRestTimeRiteOrdsServiceGetGetContractDetailsResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetContractDetails',
        uriParams: {
          'CUSTOMER_NUMBER': $page.variables.localCustomerObj.CUSTOMER_NUMBER,
        },
      });

      if (callRestTimeRiteOrdsServiceGetGetContractDetailsResult.ok) {
        $page.variables.contractsADP.data = callRestTimeRiteOrdsServiceGetGetContractDetailsResult.body.items;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Contract Details',
          displayMode: 'transient',
        });
      }

      const callComponentMethodCustSearchCloseResult = await Actions.callComponentMethod(context, {
        selector: '#custSearch',
        method: 'close',
      });
    }
  }

  return selectButtonActionChain;
});
