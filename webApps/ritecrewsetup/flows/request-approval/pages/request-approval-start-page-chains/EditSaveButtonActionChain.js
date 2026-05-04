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
 
let storeApiName;
let errMsg;
let pageName = 'request-approval-start';    
      try {
             const currrow = $variables.currentRow;
     let tableData = $variables.equpADP.data;
     let isResult = true;

      const results = await ActionUtils.forEach(tableData, async (item, index) => {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

      const editpayload = await $functions.getApporvePayloadEdit(currrow, item);

        storeApiName = 'putEQPRite_PMArroval';
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putEQPRite_PMArroval',
        body: editpayload,
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

  return EditSaveButtonActionChain;
});
