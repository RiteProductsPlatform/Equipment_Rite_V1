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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.reservedEquipment.data',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getQuoteDetails2',
        uriParams: {
          'p_res_number': $flow.variables.rentalReservationNumber,
        },
      });

      $variables.reservedEquipment.data = response.body.items;

      // ---- TODO: Add your code here ---- //
      console.log('##@@#@@', $variables.reservedEquipment.data)
    }
  }

  return PageVbEnterChain;
});
