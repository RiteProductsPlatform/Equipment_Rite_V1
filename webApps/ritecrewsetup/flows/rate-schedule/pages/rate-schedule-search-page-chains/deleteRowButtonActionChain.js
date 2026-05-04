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

  class deleteRowButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/deleteInsertRateDetails',
        uriParams: {
          'p_eqp_rate_row_detail_id': current.row.eqp_rate_row_detail_id,
        },
      });

      if (response.ok) {
        await Actions.fireDataProviderEvent(context, {
          target: $variables.billrateSchedulesDetailsAdp,
          refresh: null,
        });
        const response1 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',
        uriParams: {
          'p_eqp_rate_row_id':  $variables.headerObj.eqp_rate_row_id,
        },
      });

      if (response1.ok) {

        $variables.billrateSchedulesDetailsAdp.data = response1.body.items;

        if (response1.body.items.length>0) {
          $variables.valueObj = response1.body.items[0];
        }
      }

        await Actions.fireNotificationEvent(context, {
          summary: 'The selected record has been successfully deleted.',
          type: 'confirmation',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return deleteRowButtonActionChain;
});
