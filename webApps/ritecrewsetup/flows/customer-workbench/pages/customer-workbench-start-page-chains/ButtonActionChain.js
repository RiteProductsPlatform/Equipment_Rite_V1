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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
debugger;
      if (current.row.status === 'Quote Requested') {
        const toEquipApproval = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'equip-approval',
          page: 'equip-approval-quote1',
          params: {
            selectedReservationNumber: current.row.rental_reservation_number,
          },
        });
      }else{
        const ojDialog4880457901Open = await Actions.callComponentMethod(context, {
          selector: '#oj-dialog-488045790-1',
          method: 'open',
        });
        
      }
    }
  }

  return ButtonActionChain;
});
