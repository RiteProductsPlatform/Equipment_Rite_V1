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

  class SyncButton extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.disableSync = true;

      const callComponentMethodSyncDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#syncDialog',
        method: 'open',
      });

      const callRestIcsEndpointPostCUSTCONTRACTMASTERLOADTODB10LOADDATATODBResult = await Actions.callRest(context, {
        endpoint: 'icsEndpoint/postCUST_CONTR_MASTE_LOAD_TO_DB1_0LOAD_DATA_TO_DB',
        body: $page.variables.syncData,
      });

      if (callRestIcsEndpointPostCUSTCONTRACTMASTERLOADTODB10LOADDATATODBResult.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Master Data Sync Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Master Data Sync Failed',
          displayMode: 'transient',
          type: 'warning',
        });
        
      }
      if ($page.variables.syncEmployee) {
        const callRestIcsEndpointPostHCMEMPTOORACLEDB10PersonSyncResult = await Actions.callRest(context, {
          endpoint: 'icsEndpoint/postHCMEMP_TO_ORACLEDB1_0PersonSync',
        });

        if (callRestIcsEndpointPostHCMEMPTOORACLEDB10PersonSyncResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Employee Data Sync Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Employee Data Sync Failed',
            displayMode: 'transient',
            type: 'warning',
          });
          
        }
      }

      $page.variables.disableSync = false;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.syncEmployee',
        ],
      });

      const callComponentMethodSyncDialogCloseResult = await Actions.callComponentMethod(context, {
        selector: '#syncDialog',
        method: 'close',
      });
    }
  }

  return SyncButton;
});
