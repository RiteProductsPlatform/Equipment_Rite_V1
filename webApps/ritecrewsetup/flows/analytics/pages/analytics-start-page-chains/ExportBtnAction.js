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

  class ExportBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/EqpUtilizationReport',
        uriParams: {
          'p_equipment_resource_class': $variables.searchObj.class ? $variables.searchObj.class : "",
          'p_from_date': $functions.formatDate($variables.searchObj.from_date),
          'p_to_date': $functions.formatDate($variables.searchObj.to_date),
          'p_report_name': $variables.searchObj.report,
          'p_equipment_name': $variables.searchObj.name ? $variables.searchObj.name : "",
        },
      });

      await $functions.csvdownload(JSON.stringify(response.body.items), $variables.searchObj.report);
    }
  }

  return ExportBtnAction;
});
