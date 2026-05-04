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

  class getEQUIPMENT_RITEEQP_INV_ORG_LOCATION1_0GetInvLocationsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_INV_ORG_LOCATION1_0GetInvLocations',
        responseType: 'getEQUIPMENTRITEEQPINVORGLOCATION1GetInvLocationsResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getEQUIPMENT_RITEEQP_INV_ORG_LOCATION1_0GetInvLocationsFetch;
});
