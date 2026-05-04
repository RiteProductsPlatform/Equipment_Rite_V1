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

      let storeApiName;

let errMsg;

let pageName = 'request-approval-start';

      try {
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

            storeApiName = 'putEQPRite_PMArroval';

            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/putEQPRite_PMArroval',
              body: payload,
              headers: {
                'R_PAGE_NAME': pageName,
                'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                'R_USER_NAME': $application.user.username,
              },
            });
            if (!response.ok)
{
errMsg =response.body?.detail ||response.body?.message ||(typeof response.body === 'string' ? response.body : null) ||response.statusText ||'API Error';
throw new Error(errMsg);
}
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

      } catch (error) {
        let errMessage =
  error?.message ||
  error?.body?.detail ||
  error?.body?.message ||
  (typeof error?.body === 'string' ? error.body : null) ||
  JSON.stringify(error);
 
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
                'p_api_name': storeApiName,
                'p_debug_message':errMessage
        },
        });
 
        await Actions.fireNotificationEvent(context, {
          summary: 'ERROR',
          message: errMessage,
          displayMode: 'persist',
          type: 'error',
        });
		
		
      } finally {
        
            const loadingDialogClose = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });
      }

        }
  }

  return ApproveActionChain;
});
