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

  class CloudSyncButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'getContractSummary/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATES1_0GetNonLaborResourceRates',
      });

      if (response.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Cloud details have been successfully synchronized',
          type: 'confirmation',
          displayMode: 'transient',
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
        
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Sync Cloud Data',
          type: 'error',
          displayMode: 'transient',
        });

        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

      }
    }
  }

  return CloudSyncButtonActionChain;
});
