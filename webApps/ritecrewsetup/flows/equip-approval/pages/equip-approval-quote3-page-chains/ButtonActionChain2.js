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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.selectedEqpQuoteAmount === 0) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please enter a valid amount',
        });
      }

      const reservationData = {
        rental_reservation_number: $flow.variables.selectedReservationNumber,
        equipment_number: $variables.selectedEquipmentNumber,
        quoteAmount: $variables.selectedEqpQuoteAmount,
        taxAmount: $variables.selectedEqpTaxAmount,
        billFrequency: $variables.selectedEqpBillFreq
      };
      if (!$variables.updateQuote) {
        $variables.updateQuote = [];
      }


      // Find index of existing entry
      let index = $variables.updateQuote.findIndex(item =>
        item.rental_reservation_number === $flow.variables.selectedReservationNumber &&
        item.equipment_number === $variables.selectedEquipmentNumber
      );

      if (index !== -1) {
        $variables.updateQuote[index] = reservationData;
      } else {
        $variables.updateQuote.push(reservationData);
      }

      await Actions.fireNotificationEvent(context, {
        summary: 'Details Saved.',
        displayMode: 'transient',
        type: 'confirmation',
      });

      const ojDialog5593265081Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--559326508-1',
        method: 'close',
      });
    }
  }

  return ButtonActionChain2;
});
