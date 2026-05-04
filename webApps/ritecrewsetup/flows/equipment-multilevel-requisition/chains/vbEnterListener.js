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

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $flow, $application, $constants, $variables } = context;


      const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05GenericLookups',
          });

          $variables.eqpClassADP.data = response.body.items[0].lookupCodes;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getEqpCrewNameLookup',
          });

          $variables.eqpCrewNameADP.data = response2.body.items[0].lookupCodes;
        },
      ].map(sequence => sequence()));
    }
  }

  return vbEnterListener;
});
