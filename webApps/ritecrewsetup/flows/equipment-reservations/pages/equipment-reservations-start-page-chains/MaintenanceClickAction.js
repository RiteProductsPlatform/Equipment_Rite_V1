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

  class MaintenanceClickAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpMasterWorkOrder',
        uriParams: {
          'equipment_name': $variables.eqpName,
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

  return MaintenanceClickAction;
});
