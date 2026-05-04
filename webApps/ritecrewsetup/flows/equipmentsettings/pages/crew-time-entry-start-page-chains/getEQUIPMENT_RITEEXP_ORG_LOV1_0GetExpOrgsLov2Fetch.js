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

  class getEQUIPMENT_RITEEXP_ORG_LOV1_0GetExpOrgsLov2Fetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'getContractSummary/getEQUIPMENT_RITEEXP_ORG_LOV1_0GetExpOrgsLov2',
        responseType: 'getEQUIPMENTRITEEXPORGLOV1GetExpOrgsLov2Response3',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      const uniqueexp = await $functions.uniqueexp(callRestEndpoint1.body.items);

      return ;
    }
  }

  return getEQUIPMENT_RITEEXP_ORG_LOV1_0GetExpOrgsLov2Fetch;
});
