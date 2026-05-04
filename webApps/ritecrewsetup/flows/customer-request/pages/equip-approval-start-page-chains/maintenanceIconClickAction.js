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

  class maintenanceIconClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {

      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpMasterWorkOrder',
        uriParams: {
          'equipment_name': current.row.equipment_name,
        },
      });

      if (response.ok) {
        $variables.EqpMasterWorkOrderADP.data = response.body.items;
      

      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Fetch Maintenance Details',
          displayMode: 'transient',
        });
        
      }

      const maintenanceDlgOpen = await Actions.callComponentMethod(context, {
        selector: '#maintenanceDlg',
        method: 'open',
      });
    }
    
  }

  return maintenanceIconClickAction;
});
