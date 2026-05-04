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

     

      if ($variables.headerobj.user) {
         let isSaved= true;
        const results = await ActionUtils.forEach($variables.editTableADP.data, async (item, index) => {
  
         const saveData =  await $functions.savePayload($variables.headerobj.user,item,$application.user.username);
  
          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_SecuritySubmit',
            body: saveData,
          });
          if(!response.ok){
            isSaved = false;
          }
         
        }, { mode: 'serial' });
        if (isSaved) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Saved Successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });
      }
      else{
         await Actions.fireNotificationEvent(context, {
           summary: 'Save Failed',
           type: 'error',
           displayMode: 'transient',
         });
      }


      }

     
    }
  }

  return SaveButtonActionChain;
});
