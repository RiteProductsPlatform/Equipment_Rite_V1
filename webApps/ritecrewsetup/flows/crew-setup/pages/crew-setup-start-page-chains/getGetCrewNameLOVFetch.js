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

  class getGetCrewNameLOVFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application } = context;
      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetCrewNameLOV',
        responseType: 'getGetCrewNameLOVResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      $page.variables.crewListArr = callRestEndpoint1.body.items;

      return callRestEndpoint1;
    }
  }

  return getGetCrewNameLOVFetch;
});
