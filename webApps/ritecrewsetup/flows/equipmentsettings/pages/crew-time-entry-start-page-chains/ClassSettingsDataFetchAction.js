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

  class ClassSettingsDataFetchAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_ClassSettings',
      });

      if (!response.ok) {
      
        return;
      } else {
        const settingsClassPageOpen = await Actions.callComponentMethod(context, {
          selector: '#Settings_class_Page',
          method: 'open',
        });

        const transformClassSettingsData = await $functions.transformClassSettingsData(response.body.items);

         $variables.ClassSettingsTblADP.data = transformClassSettingsData;
      }
    }
  }

  return ClassSettingsDataFetchAction;
});
