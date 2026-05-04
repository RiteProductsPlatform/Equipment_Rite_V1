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
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;
        const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getQuoteDetails2',
        uriParams: {
          'p_res_number': $flow.variables.selectedReservationNumber,
        },
      });

      $variables.reserverdEquipmentDetails.data = response.body.items;

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getResCustomers',
        uriParams: {
          'p_res_number': $flow.variables.selectedReservationNumber,
        },
      });

      $variables.customerObject = response2.body.items[0];
    }
  }

  return PageVbEnterChain;
});
