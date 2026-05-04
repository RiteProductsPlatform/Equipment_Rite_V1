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

  class TR_customerSearchLOvbtn extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestTimeRiteOrdsServiceCustDetailsResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/CustDetails',
        uriParams: {
          'customer_number': $page.variables.searchCustomer,
        },
      });

      $page.variables.varCustomerADP.data = callRestTimeRiteOrdsServiceCustDetailsResult.body.items;

      $page.variables.custDetailsObj = callRestTimeRiteOrdsServiceCustDetailsResult.body.items[0];

      const callRestTimeRiteOrdsServiceGetGetContractDetailsResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetContractDetails',
        uriParams: {
          'CUSTOMER_NUMBER': $page.variables.custDetailsObj.customer_number,
        },
      });

      $page.variables.contractsADP.data = callRestTimeRiteOrdsServiceGetGetContractDetailsResult.body.items;
    }
  }

  return TR_customerSearchLOvbtn;
});
