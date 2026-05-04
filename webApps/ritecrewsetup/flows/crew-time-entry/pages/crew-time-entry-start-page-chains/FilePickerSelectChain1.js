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

  class FilePickerSelectChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object[]} params.files
     * @param {any} params.originalEvent
     */
    async run(context, { event, files, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      //  if (files.length > 0) {
      

      //   const processFile2 = await $functions.processFile(files[0]);
      //   $variables.FilteredData = await $functions.updateSelRows(processFile2, $variables.selectedRowdata, $variables.FilteredData);

      // }
      // debugger;
      let storeApiName;
let errMsg;
let pageName = 'crew-time-entry';
 

      try {
        
      if (files.length > 0) {

        const uploadingOpen = await Actions.callComponentMethod(context, {
          selector: '#uploading',
          method: 'open',
        });

        const converImageBase64 = await $functions.converImageBase64(files[0]);

        const postAttachments = await $functions.postAttachments($variables.selectedRowdata, converImageBase64, $application.variables.user || $application.user.username ||"", files[0]);

          storeApiName = 'postEQPRite_FileAttachments';

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_FileAttachments',
          body: postAttachments,
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
        });

        if (!response.ok) {
 
  errMsg =
    response.body?.detail ||
    response.body?.message ||
    (typeof response.body === 'string' ? response.body : null) ||
    response.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'The file was attached successfully.',
            displayMode: 'transient',
            type: 'confirmation',
          });

          const actionspopupClose = await Actions.callComponentMethod(context, {
            selector: '#actionspopup',
            method: 'close',
          });

          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#uploading',
          method: 'close',
        });
        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
         selector: '#uploading',
          method: 'close',
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

      }
       finally {
        
        const loadingDialogClose = await Actions.callComponentMethod(context, {
         selector: '#uploading',
          method: 'close',
        });
                  const actionspopupClose = await Actions.callComponentMethod(context, {
            selector: '#actionspopup',
            method: 'close',
          });
      }

    }
  }

  return FilePickerSelectChain1;
});
