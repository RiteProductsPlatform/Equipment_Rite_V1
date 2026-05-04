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

  class searchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPAdmin_ChecklistSearch',
        uriParams: {
          'p_check_list_name': $variables.headerObj.checkListName?$variables.headerObj.checkListName:"",
          'p_equipment_name': $variables.headerObj.equipmentName?$variables.headerObj.equipmentName:"",
          'p_equipment_class': $variables.headerObj.eqpclass? $variables.headerObj.eqpclass:"",
        },
      });

      $variables.eqpCheckListSearchADP.data = response.body.items;

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.eqpCheckListSearchADP,
      });
    }
  }

  return searchButtonActionChain;
});
