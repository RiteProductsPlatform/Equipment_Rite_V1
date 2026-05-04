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

  class getEQUIPMENT_RITEEQP_CUSTOMER_DETAILS1_0GetCustomerDetailsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'getContractSummary/getEQUIPMENT_RITEEQP_CUSTOMER_DETAILS1_0GetCustomerDetails',
        responseType: 'getEQUIPMENTRITEEQPCUSTOMERDETAILS1GetCustomerDetailsResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getEQUIPMENT_RITEEQP_CUSTOMER_DETAILS1_0GetCustomerDetailsFetch;
});
