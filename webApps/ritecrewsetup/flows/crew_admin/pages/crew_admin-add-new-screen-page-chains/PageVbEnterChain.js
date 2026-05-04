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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

 $variables.MasterTabObj.status=true

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/InventoryOrganizations',
      });

      $variables.inventoryOrganizationsListADP.data = response.body.items;

      const projects = await Actions.callRest(context, {
        endpoint: 'projectNameList/get11_13_18_05Projects',
      });

      $variables.projectNameADP.data = projects.body.items;

      // const response2 = await Actions.callRest(context, {
      //   endpoint: 'getContractSummary/getEQUIPMENT_RITEITEMS_LOV1_0GetItemValues',
      // });

      // const uniqueexp = await $functions.uniqueexp(response2.body.items);

      // $variables.inventoryitemAdp.data = uniqueexp;

    
    }
  }

  return PageVbEnterChain;
});
