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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetManagerQuoteDetails',
      });
      $variables.reservationADP.data = response.body.items;
      $variables.workbenchADP.data = response.body.items;
      $variables.cutomernameADP.data = response.body.items;

      const response2 = await Actions.callRest(context, {
        endpoint: 'Procurement_Module/getCurrenciesLOV',
      });

      $variables.currencyCodeADP.data = response2.body.items;

      const response3 = await Actions.callRest(context, {
        endpoint: 'Procurement_Module/getLegalEntitiesLOV',
      });

      $variables.legalentityADP.data = response3.body.items;

      const response4 = await Actions.callRest(context, {
        endpoint: 'Procurement_Module/getInventoryOrganizations',
      });

      $variables.inventoryorgADP.data = response4.body.items;

      const response5 = await Actions.callRest(context, {
        endpoint: 'Hcm_Latest/getOrganizations',
      });

      $variables.orgADP.data = response5.body.items;

    }
  }

  return PageVbEnterChain;
});
