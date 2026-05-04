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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRent_Billing_Details',
        uriParams: {
          'p_customer_name': $variables.selectedPartyName?$variables.selectedPartyName:'',
          'p_contract': $variables.selectedContract?$variables.selectedContract:'',
          'p_equipment_class': $variables.selectedEqpClass?$variables.selectedEqpClass:'',
          'p_request_number': $variables.selectedRequestedNumber?$variables.selectedRequestedNumber:'',
        },
      });

      $variables.tableData.data = response.body.items;
    }
  }

  return ButtonActionChain;
});
