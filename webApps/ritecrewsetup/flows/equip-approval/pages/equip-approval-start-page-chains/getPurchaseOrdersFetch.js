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

  class getPurchaseOrdersFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;



        const callRestEndpoint1 = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/getPurchaseOrders',
          uriParams: {
            // q: "OrderNumber="+$variables.poVariables.ponumber,
            // q: "OrderNumber='" + $variables.poVariables.ponumber + "'"
            q: "OrderNumber%20like%20'" + $variables.poVariables.ponumber + "%25'"
          },
          responseType: 'getPurchaseOrdersResponse',
          hookHandler: configuration.hookHandler,
          requestType: 'json',
        });
        return callRestEndpoint1;
     

      
    }
  }

  return getPurchaseOrdersFetch;
});
