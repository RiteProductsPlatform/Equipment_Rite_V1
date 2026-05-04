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

  class getRoleBasedNavData extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $application, $constants, $variables, $functions } = context;

  //     await Actions.resetVariables(context, {
  //       variables: [
  //   '$application.variables.NavTree',
  // ],
  //     });

     // const navigationContent = await $functions.getNavigationContent($functions.getMetadata($variables.settingsEnabled,$variables.isrentalEnabled,$variables.isApproverEnabled,$application.variables.isTimeentryenabled,$application.variables.isequipmentManagerEnabled,$application.variables.isprojectmanagerenabled,$application.variables.isAnalyticsEnabled));

     // $variables.NavTree = navigationContent;
    }
  }

  return getRoleBasedNavData;
});
