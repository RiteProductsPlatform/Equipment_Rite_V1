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

  class ApproveActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if($variables.selectedRows){
        console.log($variables.selectedRows);
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        if($variables.selectedRows.keys.all=== false){
         const adp = $variables.tableADP ;
        const selectedKeys = $variables.selectedRows.keys;
        const selectedRows =[];
         
          adp.data.forEach((row) => {
            selectedKeys.keys.forEach((itm) => {
               if (row.equipment_request_id === itm) {
                selectedRows.push(row);
              }
            });
          });

          let isSucess= true;
          const results = await ActionUtils.forEach(selectedRows, async (item, index) => {

           const payload =  await $functions.getApporvePayload(item);

            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/putEQPRite_PMArroval',
              body: payload,
            });
            if(!response.ok){
              isSucess = false;
            }

          }, { mode: 'serial' }); 
          if(isSucess) {


            const loadingDialogClose = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.callChain(context, {
              chain: 'SearchBtnAction',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Approved Successfully',
              displayMode: 'transient',
              type: 'confirmation',
            });
           

            
          }
        }
      }
    }
  }

  return ApproveActionChain;
});
