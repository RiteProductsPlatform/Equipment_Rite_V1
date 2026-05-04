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

  class IconClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // ---- TODO: Add your code here ---- //
      
      console.log('$$$$4',current.data);

      await Actions.resetVariables(context, {
        variables: [
    '$flow.variables.selectedReservationNumber',
  ],
      });

      $flow.variables.selectedReservationNumber = current.data.rental_reservation_number;

      await Actions.fireNotificationEvent(context, {
        summary: $flow.variables.selectedReservationNumber,
      });
    }
  }

  return IconClickChain;
});
