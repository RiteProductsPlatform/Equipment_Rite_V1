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
      const { $page, $flow, $application, $constants, $variables, $eq } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.tableADP.data',
        ],
      });

      //$variables.reqName = $application.variables.user ?
      //$application.variables.user : null;

      let status = $variables.status;
      if ($variables.status === 'PENDING ACCEPTANCE') {
        status = 'EQP INSPECTION COMPLETED';
      }

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
        uriParams: {
          eqpName: $variables.eqpName ? $variables.eqpName : '',
          eqpClass: $variables.eqClass ? $variables.eqClass : '',
          reqStatus: status ? status : '',
          'projectNumber': $variables.prjname  ? $variables.prjname  : '',
          'request_type': $variables.request_type ? $variables.request_type : '',
          'eqp_request_number': $variables.requestnumber ? $variables.requestnumber : "",
          'p_page_name': 'equipment-reservations',
          'p_requestor_name': $variables.reqName ? $variables.reqName : "",
        },
      });

      $variables.tableADP.data = response.body.items;

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getQuoteDetails2',
      });

      $variables.rentalADP.data = response2.body.items;
    }
  }

  return SearchBtnAction;
});
