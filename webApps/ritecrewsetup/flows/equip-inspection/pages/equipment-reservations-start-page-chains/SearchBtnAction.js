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

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.tableADP',
          '$page.variables.tableADP.data',
        ],
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.tableADP,
        refresh: null,
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_InspectionDetails',
        uriParams: {
          'eqp_request_number': $variables.inspectionheaderobj.filterfield === 'Request Number' ? $variables.inspectionheaderobj.searchfield : "",
          eqpClass: $variables.inspectionheaderobj.filterfield === 'Class' ? $variables.inspectionheaderobj.searchfield : "",
          eqpname: $variables.inspectionheaderobj.filterfield === 'Equipment Name'  ? $variables.inspectionheaderobj.searchfield : "",
          'project_name': $variables.inspectionheaderobj.filterfield === 'Project Name' ? $variables.inspectionheaderobj.searchfield : "",
          'p_page_name': 'equip-inspection',
          'request_type': 'Project',
        },
      });

      $variables.tableADP.data = response.body.items;
    }
  }

  return SearchBtnAction;
});
