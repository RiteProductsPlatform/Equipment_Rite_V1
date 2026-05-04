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

  class SavebuttonAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const createSystemReq = await $functions.createSystemReq($variables.searchObjParams);

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEquipmentSettings',
        body: createSystemReq,
      });

      if (!response.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Save Record ',
          displayMode: 'transient',
        });
      
        return;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Record Saved Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.callChain(context, {
          chain: 'application:getRoleBasedNavData',
        });

        await $application.functions.pageRefresh();

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.searchobj',
    '$page.variables.searchObjParams',
  ],
        });
      }
    }
  }

  return SavebuttonAction;
});
