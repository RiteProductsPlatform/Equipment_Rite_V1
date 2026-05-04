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

  class actionclickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const toEquipApproval = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'equip-approval',
        page: 'equip-approval-quote3',
        params: {
          selectedReservationNumber: current.row.rental_reservation_number,
          selectedrow: current.row,
        },
        history: 'push',
      });

      const loadingDialogOpen2 = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });
    }
  }

  return actionclickChain;
});
