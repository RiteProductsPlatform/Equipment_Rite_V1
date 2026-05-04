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

  class DetailsIconClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.infoSelectRow = index;
      $variables.popUpEqpName = $variables.equipmentADP.data[index].equipment_name;
      $variables.fileContent = $variables.equipmentADP.data[index].file_content;
      $variables.fileNamePopup = $variables.equipmentADP.data[index].file_name;
      $variables.eqpId = $variables.equipmentADP.data[index].equipment_id;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEquipmentMaster',
        uriParams: {
          'p_equipment_name': current.row.equipment_name,
          'p_asset_org': "",
          'p_eqp_class': "",
        },
      });

      const toShell = await Actions.navigateToPage(context, {
        page: '/shell/crew_admin/crew_admin-search',
        params: {
          RowData: response.body.items[0],
          pagetype: 'Request',
        },
      });
    }
  }

  return DetailsIconClickAction;
});
