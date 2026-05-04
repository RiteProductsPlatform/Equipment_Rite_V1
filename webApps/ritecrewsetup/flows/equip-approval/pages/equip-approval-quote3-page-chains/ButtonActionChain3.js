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
       const results = await ActionUtils.forEach($variables.updateQuote, async (item, index) => {

        const callFunction = await this.createPayload(context, { arg1: $flow.variables.selectedReservationNumber, arg2: item.equipment_number, arg3: item.quoteAmount, arg4: item.taxAmount, arg5: 40004000, arg6: 'Quote Generated', arg7: item.billFrequency });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putQuoteDetails',
          body: callFunction,
        });
      }, { mode: 'serial' });

      await Actions.fireNotificationEvent(context, {
        type: 'confirmation',
        summary: 'Quote Saved Successfully',
      });

      await Actions.navigateBack(context, {
      });
    }

 async createPayload(context, { arg1 ,arg2,arg3,arg4,arg5,arg6,arg7}) {
      const { $page, $flow, $application, $constants, $variables } = context;
           let payload = {
"p_res_number":arg1,
"p_eqp_number":arg2,
"p_quote_amount":arg3,
"p_tax_amount":arg4,
"p_customer_number":arg5,
"p_status":arg6,
"p_bill_freq":arg7
};
return payload;
    }



  }

  return ButtonActionChain3;
});
