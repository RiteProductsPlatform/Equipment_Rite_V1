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

  class viewSettingsActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_MISCTransactions',
      });

      $variables.miscSettingsAdp.data = response.body.items;

      const miscSettingsOpen = await Actions.callComponentMethod(context, {
        selector: '#miscSettings',
        method: 'open',
      });
    }
  }

  return viewSettingsActionChain;
});
