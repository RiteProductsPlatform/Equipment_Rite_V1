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

  class toggleDrawerHandler extends ActionChain {

    /**
     * Toggles the navigation drawer for the page
     * @param {Object} context
     */
    async run(context) {
      const { $application, $variables, $functions } = context;

      $variables.navDrawer = !$variables.navDrawer;
    }
  }

  return toggleDrawerHandler;
});
