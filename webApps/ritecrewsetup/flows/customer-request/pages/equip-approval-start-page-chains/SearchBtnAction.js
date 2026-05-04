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

      const response3 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetManagerQuoteDetails',
      });

      $variables.rentalADP.data = response3.body.items;
      $variables.reservationADP.data = response3.body.items;
      $variables.customerADP.data = response3.body.items;

      // const response = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/getGetEqpRequestApproval2',
      //   uriParams: {
      //     eqpClass: $variables.eqpClass?$variables.eqpClass:'',
      //     startDate: $variables.startDate?$variables.startDate:'',
      //     endDate: $variables.endDate?$variables.endDate:'',
      //     eqpName: $variables.eqpName?$variables.eqpName:'',
      //     reqName: $variables.requestor_name ? $variables.requestor_name :'',
      //     'project_name': $variables.project_name_var ? $variables.project_name_var : '',
      //     customer: $variables.customer_name ? $variables.customer_name : '',
      //     'eqp_request_number': $variables.requestnumber ? $variables.requestnumber : "",
      //     'p_status': $variables.eqpstatus ? $variables.eqpstatus : "",
      //     'equipment_cart_number': $variables.cartNumber ? $variables.cartNumber:"",
      //     'request_type': $variables.request_type?$variables.request_type:"",
      //   },
      // });

      // $variables.tableADP.data = response.body.items;

      // await Actions.fireDataProviderEvent(context, {
      //   refresh: null,
      //   target: $variables.tableADP,
      // });
    }
  }

  return SearchBtnAction;
});
