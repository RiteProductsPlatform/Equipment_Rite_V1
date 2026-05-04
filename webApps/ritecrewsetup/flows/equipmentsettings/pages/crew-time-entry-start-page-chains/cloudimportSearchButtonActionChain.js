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

  class cloudimportSearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const validateGroup = await $application.functions.validateGroup('cloudimportvalid');

      if (validateGroup==="valid") {
        

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getEquipmentMaster',
          uriParams: {
            'p_eqp_class': $variables.cloudimportObj.eqpClass || "",
            'p_equipment_name': $variables.cloudimportObj.eqpName || "",
            'p_asset_group': $variables.cloudimportObj.assetGroup || "",
          },
        });

        if (response.ok) {
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          $variables.eqData.data = response.body.items;
          
        }else{
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to fetch data',
            type: 'error',
            displayMode: 'transient',
          });
          
        }
      }
    }
  }

  return cloudimportSearchButtonActionChain;
});
