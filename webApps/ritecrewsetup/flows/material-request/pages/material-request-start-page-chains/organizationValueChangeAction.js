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

  class organizationValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, data, metadata, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.ftorowData.organization_code = data.OrganizationCode;
      $variables.ftorowData.organization_id = data.OrganizationId;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/getItemNumber',
        uriParams: {
          q: "ItemNumber<>'@@@@';OrganizationId='"+$variables.ftorowData.organization_id+"'",
        },
      });

      if (!response.ok) {

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.ItemNumberADP.data',
  ],
        });

        return;
      } else {
          $variables.ItemNumberADP.data = response.body.items;

        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }


    }
  }

  return organizationValueChangeAction;
});
