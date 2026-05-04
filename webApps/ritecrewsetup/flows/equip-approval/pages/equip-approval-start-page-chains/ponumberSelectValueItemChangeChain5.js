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

  class ponumberSelectValueItemChangeChain5 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (data) {
        const response = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_PO_RECEIPT_DETAILS1_0GetPOReceiptDetails',
          uriParams: {
            'p_po_number': data.name,
          },
        });

        $variables.poLineADP.data = response.body.items;
          $variables.poVariables.pohdrId = data.po_header_id;

      //  $variables.poVariables.poline = data.po_line_number;
      //  $variables.poVariables.pocost = data.unit_price;
      //  $variables.poVariables.receipt = data.receipt_number; 
      }
    }
  }

  return ponumberSelectValueItemChangeChain5;
});
