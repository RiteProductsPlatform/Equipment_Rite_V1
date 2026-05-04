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

  class getEQUIPMENT_RITEITEMS_LOV1_0GetItemValuesFetch2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $eq } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'getContractSummary/getEQUIPMENT_RITEITEMS_LOV1_0GetItemValues',
        uriParams: {
          'p_organization_id': $variables.assetobj.item_organization_id || $variables.selectedorgValueObj.orgId || "",
        },
        responseType: 'getEQUIPMENTRITEITEMSLOV1GetItemValuesResponse3',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getEQUIPMENT_RITEITEMS_LOV1_0GetItemValuesFetch2;
});
