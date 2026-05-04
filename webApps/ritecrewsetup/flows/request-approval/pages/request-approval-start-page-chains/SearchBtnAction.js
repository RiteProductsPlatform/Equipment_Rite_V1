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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.requestnumber = $variables.navSelectedrow.eqp_request_number;
      // $variables.requestor_name = $variables.navSelectedrow.requestor_name;
      // $variables.project_name_var = $variables.navSelectedrow.project_name;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEqpRequestApproval2',
        uriParams: {
          eqpClass: $variables.eqpClass?$variables.eqpClass:'',
          startDate: $variables.startDate?$variables.startDate:'',
          endDate: $variables.endDate?$variables.endDate:'',
          eqpName: $variables.eqpName?$variables.eqpName:'',
          reqName: $variables.requestor_name ? $variables.requestor_name :'',
          'project_name': $variables.project_name_var ? $variables.project_name_var : '',
          'request_type': $variables.request_type ? $variables.request_type : '',
          customer: $variables.customer_name ? $variables.customer_name : '',
          'eqp_request_number': $variables.requestnumber ? $variables.requestnumber : "",
          'p_status': $variables.eqpstatus?$variables.eqpstatus : "",
          'equipment_cart_number': $variables.cartNumber ? $variables.cartNumber:"",
        },
      });

      $variables.tableADP.data = response.body.items;

      const response3 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetManagerQuoteDetails',
      });

      $variables.rentalADP.data = response3.body.items;
    }
  }

  return SearchBtnAction;
});
