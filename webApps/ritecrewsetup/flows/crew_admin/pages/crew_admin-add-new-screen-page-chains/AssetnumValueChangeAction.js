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

  class AssetnumValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if (data) {
  $variables.AssetsTabObj.asset_id = data.AssetId;

     const response= await Actions.callRest(context, {
       endpoint: 'projectNameList/get11_13_18_05InstalledBaseAssets',
       uriParams: {
         q: "AssetNumber='"+$variables.AssetsTabObj.assetNumber+"'",
       },
     });

      $variables.get1113185InstalledBaseAssetsListItemADP.data = response.body.items;
      }

     
    }
  }

  return AssetnumValueChangeAction;
});
