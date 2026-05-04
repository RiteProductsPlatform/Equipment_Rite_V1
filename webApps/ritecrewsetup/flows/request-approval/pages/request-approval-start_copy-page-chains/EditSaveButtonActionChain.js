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

  class EditSaveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
     

     const currrow = $variables.currentRow;
     let tableData = $variables.equpADP.data;
     let isResult = true;

      const results = await ActionUtils.forEach(tableData, async (item, index) => {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

      const editpayload = await $functions.getApporvePayloadEdit(currrow, item);
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putEQPRite_PMArroval',
        body: editpayload,
      });
        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

      if(!response.ok){
        isResult = false;
      }


      }, { mode: 'serial' });
      if(isResult){

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$variables.selectedRows',
  ],
        });

        const editDailogClose = await Actions.callComponentMethod(context, {
          selector: '#EditDailog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Saved Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });


        
      }

     
   


        
      
      

     
    

    }
  }

  return EditSaveButtonActionChain;
});
