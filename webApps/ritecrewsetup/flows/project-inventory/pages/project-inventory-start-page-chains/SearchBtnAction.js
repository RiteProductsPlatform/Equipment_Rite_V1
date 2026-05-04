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

      // const response = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/getGetEqpRequestApproval2',
      //   uriParams: {
      //     eqpClass: $variables.eqpClass ? $variables.eqpClass : '',
      //     startDate: $variables.startDate ? $variables.startDate : '',
      //     endDate: $variables.endDate ? $variables.endDate : '',
      //     eqpName: $variables.eqpName ? $variables.eqpName : '',
      //     reqName: $variables.requestor_name ? $variables.requestor_name : '',
      //     'project_name': $variables.project_name_var ? $variables.project_name_var : '',
      //     'request_type': $variables.request_type ? $variables.request_type : '',
      //     customer: $variables.customer_name ? $variables.customer_name : '',
      //     'eqp_request_number': $variables.requestnumber ? $variables.requestnumber : "",
      //     'p_status': $variables.eqpstatus ? $variables.eqpstatus : "",
      //     'equipment_cart_number': $variables.cartNumber ? $variables.cartNumber : "",
      //   },
      // });

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_MaterialRequestSearch',
        uriParams: {
          enddate: $variables.endDate ? $variables.endDate : "",
          'eqp_request_number': $variables.requestnumber ? $variables.requestnumber : "",
          startdate: $variables.startDate ? $variables.startDate : "",
          'request_type': $variables.request_type ? $variables.request_type : "",
          eqpclass: $variables.eqpClass ? $variables.eqpClass : "",
          eqpname: $variables.eqpName ? $variables.eqpName : "",
          'equipment_cart_number': $variables.cartNumber ? $variables.cartNumber : "",
          'p_status': $variables.eqpstatus ? $variables.eqpstatus : "",
          'project_name': $variables.project_name_var ? $variables.project_name_var : "",
          reqname: $variables.requestor_name ? $variables.requestor_name : "",
        },
      });

      $variables.tableADP.data = response2.body.items;

      const response3 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetManagerQuoteDetails',
      });

      $variables.rentalADP.data = response3.body.items;
    }
  }

  return SearchBtnAction;
});
