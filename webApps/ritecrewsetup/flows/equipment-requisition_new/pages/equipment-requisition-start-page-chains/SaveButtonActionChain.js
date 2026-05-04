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

  class SaveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      let isSavedAll = true;

      const results = await ActionUtils.forEach($variables.equipmentnewADP.data, async (item, index) => {

       const postPayload = await $functions.getPostPayload(item);

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postTestEQP_RequestPage',
          body: postPayload,
        });

        if (!response.ok) {
           isSavedAll =false;
        }


       
      }, { mode: 'serial' });

      if (isSavedAll) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Equipment Request Saved Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }
      else{
         await Actions.fireNotificationEvent(context, {
          summary: 'Equipment Request Saved Failed',
          displayMode: 'transient',
          type: 'error',
        });
      }
    }
  }

  return SaveButtonActionChain;
});
