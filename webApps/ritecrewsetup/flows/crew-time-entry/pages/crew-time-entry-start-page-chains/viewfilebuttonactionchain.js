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

  class viewfilebuttonactionchain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_FileAttachments',
        uriParams: {
          'p_equipment_request_id': $variables.selectedRowdata.equipment_request_id,
        },
      });

      if (response.ok && response.body.items.length>0) {
        if (response.body.items[0].file_content) {

          const loadingDialogOpen = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });

          await $functions.downloadBase64File(response.body.items[0].file_content,response.body.items[0].file_name);

          const actionspopupClose = await Actions.callComponentMethod(context, {
            selector: '#actionspopup',
            method: 'close',
          });

          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
        }

      }else{
        const actionspopupClose2 = await Actions.callComponentMethod(context, {
          selector: '#actionspopup',
          method: 'close',
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'No file was found for the selected record',
          displayMode: 'transient',
          type: 'info',
        });
        
      }
    }
  }

  return viewfilebuttonactionchain;
});
