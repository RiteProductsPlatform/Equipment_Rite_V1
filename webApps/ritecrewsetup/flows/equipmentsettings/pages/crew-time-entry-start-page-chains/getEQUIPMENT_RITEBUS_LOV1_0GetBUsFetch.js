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

  class getEQUIPMENT_RITEBUS_LOV1_0GetBUsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'getContractSummary/getEQUIPMENT_RITEBUS_LOV1_0GetBUs',
        responseType: 'getEQUIPMENTRITEBUSLOV1GetBUsResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getEQUIPMENT_RITEBUS_LOV1_0GetBUsFetch;
});
