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

  class ViewSettingsBtnAction extends ActionChain {


    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpSettings',
      });



      $variables.eqpSettingsAdp.data = response.body.items;

      const settingsDetailPageOpen = await Actions.callComponentMethod(context, {
        selector: '#Settings_Detail_Page',
        method: 'open',
      });
    }
  }

  return ViewSettingsBtnAction;
});
