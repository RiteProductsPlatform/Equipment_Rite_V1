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

  class SelectValueItemChangeChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;
// privious code//
     // $variables.assetOrg = data.organization;
       $variables.assetOrg = data.OrganizationName?data.OrganizationName:'';

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/get11_13_18_05InstalledBaseAssets',
        uriParams: {
          q: "OperatingOrganizationName ='"+$variables.AssetsTabObj.asset_organization +"'",
          limit: '1000',
        },
      });

      $variables.get1113185InstalledBaseAssetsListADP.data = response.body.items;
    }
  }

  return SelectValueItemChangeChain3;
});
