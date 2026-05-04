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

  class SettingsEnabledAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $application.variables.settingsEnabled = $application.variables.settingsEnabled ? false:true;

      await Actions.callChain(context, {
        chain: 'application:resetData',
      });
    }
  }

  return SettingsEnabledAction;
});
