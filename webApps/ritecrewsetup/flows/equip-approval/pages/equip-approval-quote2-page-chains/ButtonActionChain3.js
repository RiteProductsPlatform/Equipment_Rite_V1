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

  class ButtonActionChain3 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let storeApiName;
      let errMsg;
      let pageName = 'equip-approval';

      try {

        const results = await ActionUtils.forEach($variables.updateQuote, async (item, index) => {

          const callFunction = await this.createPayload(context, { arg1: $flow.variables.selectedReservationNumber, arg2: item.equipment_number, arg3: item.quoteAmount, arg4: item.taxAmount, arg5: 40004000, arg6: 'Quote Generated', arg7: item.billFrequency });

          storeApiName = 'putQuoteDetails';

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/putQuoteDetails',
            headers: {
              'R_PAGE_NAME': pageName,
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
            body: callFunction,
          });
          if (!response.ok) {
            errMsg = response.body?.detail ||
              response.body?.message ||
              (typeof response.body === 'string' ? response.body : null) ||
              response.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }
        }, { mode: 'serial' });

        await Actions.fireNotificationEvent(context, {
          type: 'confirmation',
          summary: 'Quote Saved Successfully',
        });

        await Actions.navigateBack(context, {
        });
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response5 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-reservations',
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": storeApiName,
            "p_debug_message": errorMessage
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });
      }
    }
    async createPayload(context, { arg1, arg2, arg3, arg4, arg5, arg6, arg7 }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      let payload = {
        "p_res_number": arg1,
        "p_eqp_number": arg2,
        "p_quote_amount": arg3,
        "p_tax_amount": arg4,
        "p_customer_number": arg5,
        "p_status": arg6,
        "p_bill_freq": arg7
      };
      return payload;
    }

  }

  return ButtonActionChain3;
});
