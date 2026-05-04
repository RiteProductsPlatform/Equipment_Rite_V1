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

  class maintenanceAssetValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;


      $variables.MasterTabObj.equipment_Num = data.name;
      $variables.AssetsTabObj.inventory_Item = data.item_number;
      $variables.assetobj.assetName = data.name;
      $variables.assetobj.asset_id = data.asset_id;
      $variables.assetobj.item_id = data.item_id;
      $variables.assetobj.item_organization_id = data.item_organization_id;
      $variables.assetobj.serial_number = data.serial_number;
      $variables.assetobj.location_organization_id = data.location_organization_id;
      $variables.assetobj.location_type = data.location_type;
      $variables.assetobj.work_center_id = data.work_center_id;
      $variables.assetobj.work_center_code = data.work_center_code;
      $variables.assetobj.work_area_id = data.work_area_id;
      $variables.assetobj.work_area_code = data.work_area_code;
      $variables.assetobj.inventory_item_id = data.inventory_item_id;
      $variables.assetobj.item_description = data.item_description;
      $variables.assetobj.item_organization = data.item_organization;
      $variables.assetobj.location_organization = data.location_organization;
      $variables.AssetsTabObj.assetNumber = data.fa_asset_number;
      $variables.AssetsTabObj.asset_id = data.fa_asset_id;
      $variables.AssetsTabObj.asset_org = data.Asset_organization;
      $variables.AssetsTabObj.asset_orgId = data.Asset_org_id;
      $variables.AssetsTabObj.asset_orgCode = data.Asset_org_code;
     


      $variables.AssetsTabObj.isinventorystock = data.INV_TRACKED;
      $variables.AssetsTabObj.isMaintenanceAsset = data.MAINT_TRACKED;
        $variables.AssetsTabObj.isFixedAsset = data.FA_TRACKED;
      



    }
  }

  return maintenanceAssetValueChangeAction;
});
