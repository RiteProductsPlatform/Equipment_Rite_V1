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

  class RequestsSearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEquipmentRequesitionStatus',
        uriParams: {
          eqpClass: $variables.searchEqpClass?$variables.searchEqpClass:'',
          reqStatus: $variables.searchStatus?$variables.searchStatus:'',
          'eqp_request_number': $variables.SearchStatusObj.requestnumber ? $variables.SearchStatusObj.requestnumber : "",
        },
      });

      $variables.tableADP.data = response.body.items;
    }
  }

  return RequestsSearchBtnAction;
});
