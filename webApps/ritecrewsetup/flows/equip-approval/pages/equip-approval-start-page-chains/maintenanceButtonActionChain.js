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

  class maintenanceButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.EqpMasterWorkOrderADP.data',
  ],
      });
      if (current.row.maintenance_asset_number) {
// debugger;
              const response = await Actions.callRest(context, {
          endpoint: 'getContractSummary/getEQUIPMENT_RITEEQP_MAINTENANCECOSTDETAILS1_0GetMaintenanceCostDetails2',
          uriParams: {
            'p_asset_number': current.row.maintenance_asset_number,
          },
        });

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        if (response.ok ) {
          if (response.body.count>0) {
            


            if (response.body.items.length>=1) {
              

              $variables.EqpMasterWorkOrderADP.data = response.body.items;

              const loadingDialogClose = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });
            }else{
              
              const loadingDialogClose2 = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                type: 'info',
                displayMode: 'transient',
                summary: 'No Data Found',
              });
            }
          }else{

            const loadingDialogClose3 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              type: 'info',
              displayMode: 'transient',
              summary: 'No Data Found',
            });

          }


        }
        else{
          const loadingDialogClose4 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Fetch Details',
            type: 'error',
            displayMode: 'transient',
          });
          

        }
      }else{
        await Actions.fireNotificationEvent(context, {
          type: 'error',
          displayMode: 'transient',
          summary: 'Maintenance asset number is missing for the selected record',
        });
        
      }

     
    }
  }

  return maintenanceButtonActionChain;
});
