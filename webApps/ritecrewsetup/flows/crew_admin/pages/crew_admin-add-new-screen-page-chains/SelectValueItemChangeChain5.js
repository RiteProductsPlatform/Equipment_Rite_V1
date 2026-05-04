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

  class SelectValueItemChangeChain5 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if(data){
      $variables.AssetsTabObj.poheaderid = data.POHeaderId;

        const response = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05PurchaseOrdersPurchaseOrdersUniqIDChildLines2',
          uriParams: {
            purchaseOrdersUniqID: data.POHeaderId,
          },
        });
        if(response.ok){
          $variables.poLineADP.data= response.body.items;
        }

      
      }
    }
  }

  return SelectValueItemChangeChain5;
});
