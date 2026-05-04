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

      await Actions.callChain(context, {
        chain: 'searchButtonActionChain',
      });

      const response3 = await Actions.callRest(context, {
        endpoint: 'projectNameList/LatestInventoryOrganizationsLOV',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/get11_13_18_05Projects',
      });

      $variables.OrganizationADP.data = response3.body.items;
      $variables.projectADP.data = response.body.items;

    }
  }

  return PageVbEnterChain;
});
