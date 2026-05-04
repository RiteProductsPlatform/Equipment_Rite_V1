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

  class getEQUIPMENT_RITEEQP_ASSETITEMMAINTEN1_0GetAssetItems2Fetch2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $co } = context;

      if ($variables.var.length>3) {
const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'getContractSummary/getEQUIPMENT_RITEEQP_ASSETITEMMAINTEN1_0GetAssetItems2',
        responseType: 'getEQUIPMENTRITEEQPASSETITEMMAINTEN1GetAssetItems2Response3',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        requestTransformOptions: {
          filter: {
            op: '$co',
            attribute: 'name',
            value: $variables.var,
          },
        },
      });

      return callRestEndpoint1;
      }

      
    }
  }

  return getEQUIPMENT_RITEEQP_ASSETITEMMAINTEN1_0GetAssetItems2Fetch2;
});
