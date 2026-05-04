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
  }

  return ButtonActionChain3;
});
