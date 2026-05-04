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

  class EquipmentClassvalueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',
        uriParams: {
          'p_rate_schedule_name': '',
          'p_equipment_resource_class': data.Meaning,
        },
      });

      $variables.RatesData = response.body.items.length > 0 ? response.body.items : [];
      $variables.MasterTabObj.equipment_class_owner = data.classOwner;

      if (!response.body.items.length > 0) {

        await Actions.fireNotificationEvent(context, {
          summary: 'No Rate Schedule Found for the selected Equipment Class. Click On Create Button to Create it',
          displayMode: 'transient',
          type: 'info',
        });

      }
    }
  }

  return EquipmentClassvalueChangeAction;
});
