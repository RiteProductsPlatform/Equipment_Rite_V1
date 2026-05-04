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

  class StatusHyperlinkClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_ErrorDetails',
        uriParams: {
          'p_eqp_request_id': current.row.equipment_request_id,
        },
      });

      if (response.ok) {
 $variables.errorTableAdp.data = response.body.items;
      }

     

      const errorDilaogOpen = await Actions.callComponentMethod(context, {
        selector: '#errorDilaog',
        method: 'open',
      });
    }
  }

  return StatusHyperlinkClickChain;
});
