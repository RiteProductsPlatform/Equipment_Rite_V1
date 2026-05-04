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

  class downloadButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.disableDownload = true;

      const callComponentMethodSyncDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#syncDialog',
        method: 'open',
      });

      const callRestTimeRiteOrdsServiceGetGetMasterDataResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetMasterData',
        uriParams: {
          'CONTRACT_NUMBER': $page.variables.contract_number,
          'PARTY_ID': $page.variables.party_id,
          'PROJECT_NUMBER': $page.variables.project_Number,
          'contract_num': $page.variables.syncData.contract_num,
          'party_id': $page.variables.syncData.party_id,
          'project_num': $page.variables.syncData.project_num,
        },
      });

      if ('callRestTimeRiteOrdsServiceGetGetMasterDataResult.ok') {
        $page.variables.masterData.data = callRestTimeRiteOrdsServiceGetGetMasterDataResult.body.items;

        if ($page.variables.masterData.data.length>0) {
          await $page.functions.exportCSV($page.variables.masterData.data);
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Data Not available',
            displayMode: 'transient',
            type: 'warning',
          });
          
        }

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.syncData',
          ],
        });
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Unable to Download File',
          displayMode: 'transient',
          type: 'error',
        }, { id: 'DownloadFail' });
        
      }

      const callComponentMethodSyncDialogCloseResult = await Actions.callComponentMethod(context, {
        selector: '#syncDialog',
        method: 'close',
      });

      $page.variables.disableDownload = false;
    }
  }

  return downloadButtonActionChain;
});
