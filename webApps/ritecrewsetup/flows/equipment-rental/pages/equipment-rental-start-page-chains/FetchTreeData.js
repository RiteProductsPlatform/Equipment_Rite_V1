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

  class FetchTreeData extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/Rent_MasterData',
      });

      const generateStructure = await $functions.generateStructure(JSON.stringify(response.body.items));

      const navigationContent = await $functions.getNavigationContent(generateStructure);

      $variables.navTree = navigationContent;
    }
  }

  return FetchTreeData;
});
