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

  class OpenPODialogBox extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // const response = await Actions.callRest(context, {
      //   endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_PO_RECEIPT_DETAILS1_0GetPOReceiptDetails',
      //   uriParams: {
      //     'p_po_number': '56',
      //   },
      // });
// debugger;
      // if (response.ok) {
      //   $variables.purchaseOrderADP.data = response.body.items;
       
      // }

      await Actions.resetVariables(context, {
        variables: [
    '$variables.poVariables',
  ],
      });

      const pOEditDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#POEditDialog',
        method: 'open',
      });
    }
  }

  return OpenPODialogBox;
});
