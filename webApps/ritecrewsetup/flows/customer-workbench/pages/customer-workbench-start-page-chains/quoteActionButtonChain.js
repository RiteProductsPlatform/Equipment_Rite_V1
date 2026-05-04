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

  class quoteActionButtonChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      if ($variables.currentRow.rowData.status === 'Quote Requested') {
        const toEquipApproval = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'equip-approval',
          page: 'equip-approval-quote1',
          params: {
            selectedReservationNumber: $variables.currentRow.rowData.rental_reservation_number,
          },
        });

        

      } else {
        // const toEquipApproval2 = await Actions.navigateToFlow(context, {
        //   target: 'parent',
        //   flow: 'equip-approval',
        //   page: 'equip-approval-quote3',
        //   params: {
        //     selectedReservationNumber: $variables.currentRow.rowData.rental_reservation_number,
        //   },
        // });

        const toEquipApproval3 = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'equip-approval',
          page: 'equip-approval-quote4',
          params: {
            selectedReservationNumber: $variables.currentRow.rowData.rental_reservation_number,
          },
        });

        // const ojDialog4880457901Open = await Actions.callComponentMethod(context, {
        //   selector: '#oj-dialog-488045790-1',
        //   method: 'open',
        // });

      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return quoteActionButtonChain;
});
