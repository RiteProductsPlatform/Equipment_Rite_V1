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

          $variables.eqpClassAdp.data = response.body.items[0].lookupCodes;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getEqpSubClass',
          });

          $variables.eqpSubClassADP.data = response2.body.items[0].lookupCodes;
        },
        async () => {
           const response3 = await Actions.callRest(context, {
             endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05GenericLookups2',
           });

          $variables.eqpTypeADP.data = response3.body.items[0].lookupCodes;
        },
        async () => {
          const response4 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05InventoryOrganizationsOpenLOV2',
            uriParams: {
              limit: '500',
            },
          });

          $variables.invOrgsAdp.data = response4.body.items;
        },
      ].map(sequence => sequence()));

    }
  }

  return vbEnterListener;
});
