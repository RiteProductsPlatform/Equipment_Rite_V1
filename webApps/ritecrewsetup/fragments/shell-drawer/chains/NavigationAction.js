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

  class NavigationAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $fragment, $application, $constants, $variables, $functions } = context;

      const navigationContent = await $application.functions.getNavigationContent($application.functions.getMetadata($application.variables.settingsEnabled));


      $variables.navTreedata = navigationContent;

    }
  }

  return NavigationAction;
});
