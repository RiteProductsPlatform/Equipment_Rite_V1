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

  class customerInputTextValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     * @param {string} params.updatedFrom 
     */
    async run(context, { value, updatedFrom }) {
      const { $page, $flow, $application } = context;

      if (updatedFrom=="internal" && $page.variables.varLocalObj.searchCustomerName) {

        const callComponentMethodLoadingDialogOpenResult = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const callRestIcsEndpointPostGETSINGLETRCUSTOMERDETAILS10TRCUSTOMERDETAILSResult = await Actions.callRest(context, {
          endpoint: 'icsEndpoint/postGET_SINGLE_TR_CUSTOMER_DETAILS1_0TR_CUSTOMER_DETAILS',
          body: {
         "CustomerName": $page.variables.varLocalObj.searchCustomerName
        },
        });

        if (!callRestIcsEndpointPostGETSINGLETRCUSTOMERDETAILS10TRCUSTOMERDETAILSResult.ok) {
        
          const callComponentMethodLoadingDialogCloseResult = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
          await Actions.fireNotificationEvent(context, {
            summary: 'Failure',
            message: 'Failure In Fetching Customers',
            displayMode: 'transient',
          });

          return;
        }

        $page.variables.varCustomerADP.data = callRestIcsEndpointPostGETSINGLETRCUSTOMERDETAILS10TRCUSTOMERDETAILSResult.body.Items;

        if ($page.variables.varCustomerADP.data.length) {
          const callComponentMethodCustSearchOpenResult = await Actions.callComponentMethod(context, {
            selector: '#custSearch',
            method: 'open',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'No Data Found',
            message: 'No records found for matching search Criteria',
            displayMode: 'transient',
          });

          // ---- ASSIGN VARIABLE ---- //
        }

        const callComponentMethodLoadingDialogClose2Result = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }
    }
  }

  return customerInputTextValueChangeChain;
});
