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

  class nonLabouDetailsButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
  const response3 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_MasterLines',
        uriParams: {
          'p_equipment_id': $variables.RowData.equipment_id,
        },
      });
      if (response3.ok) {
   $variables.nonResourceAdp.data = response3.body.items;
      }

   
      const nonLabourOpen = await Actions.callComponentMethod(context, {
        selector: '#non-labour',
        method: 'open',
      });
    }
  }

  return nonLabouDetailsButtonActionChain;
});
