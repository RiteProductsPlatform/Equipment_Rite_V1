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

  class submitButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodLoadingDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const callRestIcsEndpointPostTRUPDATECUSTOMERDETAILS10CustomersResult = await Actions.callRest(context, {
        endpoint: 'icsEndpoint/postTR_UPDATE_CUSTOMER_DETAILS1_0Customers',
        body: $page.variables.localCustomerObj,
      });

      if (!callRestIcsEndpointPostTRUPDATECUSTOMERDETAILS10CustomersResult.ok) {
        const callComponentMethodLoadingDialogClose2Result = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      
        return;
      }

      $page.variables.localCustomerObj_backup = $page.variables.localCustomerObj;

      const callComponentMethodLoadingDialogCloseResult = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return submitButtonActionChain;
});
