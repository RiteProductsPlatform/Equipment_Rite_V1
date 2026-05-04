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

  class rejectButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
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
            let rejectPayload = {

        "p_comments": "",
        "p_date": $application.functions.getFormattedDate(),
        "p_status": "",
        "p_action" : "REJECTED",
        "p_eqp_request_id": item.equipment_request_id,
        "p_pagename":$application.currentPage.id

      };
            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
              body: rejectPayload,
            });

            if(!response.ok){
              const loadingDialogClose2 = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                summary: 'Failed To Reject Requests',
                type: 'error',
                displayMode: 'transient',
              });

              isSucess = false;

              await Actions.callChain(context, {
                chain: 'SearchBtnAction',
              });
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
              summary: 'Rejected Successfully',
              displayMode: 'transient',
              type: 'confirmation',
            });
           

            
          }
        }
      }
    }
  }

  return rejectButtonActionChain;
});
