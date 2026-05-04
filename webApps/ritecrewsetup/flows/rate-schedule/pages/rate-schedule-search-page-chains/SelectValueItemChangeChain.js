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

  class SelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;

      

      $variables.headerObj.eqp_rate_row_id = data.eqp_rate_row_id;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',
        uriParams: {
          'p_eqp_rate_row_id': data.eqp_rate_row_id,
        },
      });

      if (response.ok) {

        $variables.billrateSchedulesDetailsAdp.data = response.body.items;

        if (response.body.items.length>0) {
          $variables.valueObj = response.body.items[0];
        }
      }
    }
  }

  return SelectValueItemChangeChain;
});
