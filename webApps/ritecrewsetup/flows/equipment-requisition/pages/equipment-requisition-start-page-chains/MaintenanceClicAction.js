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

  class MaintenanceClicAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpMasterWorkOrder',
        uriParams: {
          'equipment_name': $variables.selectedRow.equipment_name,
        },
      });

      if (response.ok) {
        $variables.EqpMasterWorkOrderADP.data = response.body.items;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Work Order Details',
          displayMode: 'transient',
        });
      }
    }
  }

  return MaintenanceClicAction;
});
