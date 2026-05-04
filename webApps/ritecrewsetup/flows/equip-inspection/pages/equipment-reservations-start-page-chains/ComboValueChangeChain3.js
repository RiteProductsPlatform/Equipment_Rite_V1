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

  class ComboValueChangeChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.inspectionheaderobj.searchfield',
        ],
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.tableADP,
        refresh: null,
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_InspectionDetails',
        uriParams: {
          'eqp_request_number': "",
          eqpClass: "",
          eqpname: "",
          'project_name': "",
          'p_page_name': 'equip-inspection',
          'request_type': 'Project',
        },
      });

      $variables.tableADP.data = response.body.items;
    }
  }

  return ComboValueChangeChain3;
});
