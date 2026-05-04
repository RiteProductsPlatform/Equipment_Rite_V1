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

  class saveIotDetails extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const results = await ActionUtils.forEach($variables.getDataIOT.data, async (item, index) => {

        const insertIotData = await $functions.insertIotData(item, $application.user.username);

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQP_IOT_Registration_Details',
          body: insertIotData,
        });

        if (response.ok) {
          $variables.IOT_status = true;
        }
        else {
          $variables.IOT_status = false;

        }

      }, { mode: 'serial' });

      if ($variables.IOT_status) {


        await Actions.fireNotificationEvent(context, {
          summary: 'Data Inserted Successfully',
          displayMode: 'persist',
          type: 'confirmation',
        });
      }
      else {


        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Save Data',
          displayMode: 'persist',
        });
      }
    }
  }

  return saveIotDetails;
});
