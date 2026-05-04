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

  class submitBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

let storeApiName;
let errMsg;
let pageName = 'equip-approval';
 
      try {
         let hasError = false;

      for (let i = 0; i < $variables.updateQuote.length; i++) {
      const item = $variables.updateQuote[i];
            
      const callFunction = {
        "p_res_number": $flow.variables.selectedReservationNumber,
        "p_eqp_number": item.equipment_number,
        "p_eqp_id": item.equipment_id,
        "p_quote_amount": item.quoteAmount,
        "p_tax_amount": item.taxAmount,
        "p_customer_number": 40004000,
        "p_status": 'Quote Generated',
        "p_bill_freq": item.billFrequency
      };
      
      storeApiName = 'putQuoteDetails';
            
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putQuoteDetails',
        body: callFunction,
        headers: {
      'R_PAGE_NAME': pageName,
      'R_TRACE_ID': $application.variables.traceIdDisplay || null,
      'R_USER_NAME': $application.user.username,
            },
      });
            
      if (!response.ok) {
             
      errMsg =
        response.body?.detail ||
        response.body?.message ||
        (typeof response.body === 'string' ? response.body : null) ||
        response.statusText ||
        'API Error';
             
      throw new Error(errMsg);
             
            }
            
            
      if (!response.ok) {
        hasError = true;
        break;
      }
            }

      if (hasError) {
        await Actions.fireNotificationEvent(context, {
          type: 'error',
          summary: 'Failed to save Rental Estimate.',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          type: 'confirmation',
          summary: 'Rental Estimate Saved Successfully',
        });

        await Actions.navigateBack(context, {
        });
      }

      } catch (error) {
        let errMessage =
  error?.message ||
  error?.body?.detail ||
  error?.body?.message ||
  (typeof error?.body === 'string' ? error.body : null) ||
  JSON.stringify(error);
 
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
                'p_api_name': storeApiName,
                'p_debug_message':errMessage
        },
        });
 
        await Actions.fireNotificationEvent(context, {
          summary: 'ERROR',
          message: errMessage,
          displayMode: 'persist',
          type: 'error',
        });
      } 




    }
  }

  return submitBtnAction;
});
