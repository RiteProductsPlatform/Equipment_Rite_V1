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

  class updateButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;



      try {

        const obj = {
  'p_business_unit': $variables.miscSettingsObj.business_unit,
  'p_costing': $variables.miscSettingsObj.costing,
  'p_week_end_day': $variables.miscSettingsObj.week_end_day,
  'p_equipment_owning_organization': $variables.miscSettingsObj.equipment_owning_organization,
  'p_project_transaction_source': $variables.miscSettingsObj.project_transaction_source,
  'p_expenditure_batch_prefix': $variables.miscSettingsObj.expenditure_batch_prefix,
};

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEQPRite_MISCTransactions',
          headers: {
            'R_PAGE_NAME': 'equipmentsettings',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          body: obj,
        });
        if (!response.ok) {
          let errMsg =
            response.body?.detail ||
            response.body?.message ||
            (typeof response.body === 'string' ? response.body : null) ||
            response.statusText ||
            'Unknown API Error';

          throw new Error(errMsg);
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Record Updated Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });
        }
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'equipmentsettings',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": 'putEQPRite_MISCTransactions',
            "p_debug_message": errorMessage
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });
      }

    }
  }

  return updateButtonActionChain;
});
