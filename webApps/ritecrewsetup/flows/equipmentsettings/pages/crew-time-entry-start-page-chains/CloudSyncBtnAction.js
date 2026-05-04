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

  class CloudSyncBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.cloudSyncObj.maintenanceAssets === true) {
        const response = await Actions.callRest(context, {
          endpoint: 'getContractSummary/postEQUIPMENT_RITEEQP_MAINTENANCEASSETSYNC1_0GetMaintenanceAssetData',
        });

        if (!response.ok) {

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Initiate Sync for  Maintenance Assets',
            displayMode: 'transient',
          });

          return;
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Maintenance Assets Sync Initiated Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

          const response3 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_CloudSync',
            body: { "maintenanceAssets": $page.variables.cloudSyncObj.maintenanceAssets, "nonlabourresource": $page.variables.cloudSyncObj.nonLabourResource },
          });
        }

      }
      if ($variables.cloudSyncObj.nonLabourResource === true) {
        const response2 = await Actions.callRest(context, {
          endpoint: 'getContractSummary/postEQUIPMENT_RITEEQP_NONLABORRESOURCESYNC1_0GetNonlabourResourceData',
        });
        if (!response2.ok) {

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Initiate Sync for Non Labour Resource',
            displayMode: 'transient',
          });

          return;
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Non Labour Resource Sync Initiated Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

          const response3 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_CloudSync',
            body: { "maintenanceAssets": $page.variables.cloudSyncObj.maintenanceAssets, "nonlabourresource": $page.variables.cloudSyncObj.nonLabourResource },
          });
        }
      }
    }
  }

  return CloudSyncBtnAction;
});
