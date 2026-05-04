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

  class getEQUIPMENT_RITEPROJECTS_LOV1_0GetProjects2Fetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // const callRestEndpoint1 = await Actions.callRest(context, {
      //   endpoint: 'getContractSummary/getEQUIPMENT_RITEPROJECTS_LOV1_0GetProjects2',
      //   responseType: 'getEQUIPMENTRITEPROJECTSLOV1GetProjects2Response',
      //   hookHandler: configuration.hookHandler,
      //   requestType: 'json',
      // });

      const response = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEPROJECTS_LOV1_0GetProjects2',
        responseType: 'getEQUIPMENTRITEPROJECTSLOV1GetProjects2Response',
      });

      return response;
    }
  }

  return getEQUIPMENT_RITEPROJECTS_LOV1_0GetProjects2Fetch;
});
