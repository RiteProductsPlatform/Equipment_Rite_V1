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

  class InventoryOrganizationsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'projectNameList/InventoryOrganizations',
        responseType: 'inventoryOrganizationsResponse',
        requestTransformOptions: {
          filter: {
            op: '$co',
            attribute: 'OrganizationName',
            value: $variables.AssetsTabObj.asset_organization,
          },
        },
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return InventoryOrganizationsFetch;
});
