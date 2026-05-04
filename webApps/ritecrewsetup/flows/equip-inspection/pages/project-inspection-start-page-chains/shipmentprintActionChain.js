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

  class shipmentprintActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_INSPECTION_DETAILS1_0TriggerTable',
        uriParams: {
          'p_equipment_request_id': $variables.selectedrow.equipment_request_id,
        },
      });

      await $functions.base64ToPdf(response.body.pdfBase64, undefined);

      await Actions.fireNotificationEvent(context, {
        summary: 'The shipment document has been successfully downloaded.',
        type: 'confirmation',
        displayMode: 'transient',
      });
    }
  }

  return shipmentprintActionChain;
});
