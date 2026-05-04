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

  class refreshEqpDataButtonActionChain6 extends ActionChain {

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

        let payload={
        "dummy":""
      };

      const response = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/postEQUIPMENT_RITEEQP_MAINTENA_DATA_SYNC1_0EQPMaintenanceDataSync2',
        body: payload,
      });

      const results = await Promise.all([
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'EQUIPMENT_RITE_OIC/postEQUIPMENT_RITEEQP_MAINTENANCECOSTDETAILS1_0MaintcostdetailsintoDB',
            body: payload,
          });
        },
        async () => {

          const response3 = await Actions.callRest(context, {
            endpoint: 'EQUIPMENT_RITE_OIC/postEQUIPMENT_RITEEQP_FA_COSTDETAILS1_0InsertDataintoDB',
            body: payload,
          });
        },
      ].map(sequence => sequence()));

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Successfully refreshed equipment data',
          type: 'confirmation',
          displayMode: 'transient',
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to refresh equipment data',
          type: 'error',
          displayMode: 'transient',
        });

 const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
      }
    }
  }

  return refreshEqpDataButtonActionChain6;
});
