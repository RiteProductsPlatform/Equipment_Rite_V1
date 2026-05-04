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

  class TR_SearchCustomerValChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      const callRestTimeRiteOrdsServiceCustDetailsResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/CustDetails',
        uriParams: {
          'customer_number': data.customer_number,
        },
      });

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.contractsADP',
          '$page.variables.ProjectsTblADP',
        ],
      });

      const callComponentMethodProjectDetailsRefreshResult = await Actions.callComponentMethod(context, {
        selector: '#project_details',
        method: 'refresh',
      });

      $page.variables.varCustomerADP.data = callRestTimeRiteOrdsServiceCustDetailsResult.body.items;

      $page.variables.custDetailsObj = callRestTimeRiteOrdsServiceCustDetailsResult.body.items[0];

      const callRestTimeRiteOrdsServiceGetGetContractDetailsResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetContractDetails',
        uriParams: {
          'CUSTOMER_NUMBER': $page.variables.custDetailsObj.customer_number,
        },
      });

      if (callRestTimeRiteOrdsServiceGetGetContractDetailsResult.ok) {
        $page.variables.contractsADP.data = callRestTimeRiteOrdsServiceGetGetContractDetailsResult.body.items;
      }
      else{
        await Actions.fireNotificationEvent(context, {
          displayMode: 'transient',
          summary: 'Unable to Fetch Contract Details',
          type: 'warning',
        });
        
      }
    }
  }

  return TR_SearchCustomerValChangeAction;
});
