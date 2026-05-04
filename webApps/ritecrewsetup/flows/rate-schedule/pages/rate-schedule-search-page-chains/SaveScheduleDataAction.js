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

  class SaveScheduleDataAction extends ActionChain {

    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let api_name = "putEqpRateScheduleHeaderUpdate";
      let page_name = "Equipment Rate Schedule";

      try {

        $variables.scheduleRowData.start_date =
          $application.functions.formatDate(
            $variables.scheduleRowData.start_date
          );

        $variables.scheduleRowData.end_date =
          $application.functions.formatDate(
            $variables.scheduleRowData.end_date
          );

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEqpRateScheduleHeaderUpdate',

          headers: {
            R_TRACE_ID: $application.variables.traceIdDisplay,
            R_USER_NAME: $application.user.username,
            R_PAGE_NAME: page_name
          },

          body: $variables.scheduleRowData,
        });

        if (!response.ok) {

          let errMsg =
            response.body?.detail ||
            response.body?.message ||
            (typeof response.body === 'string'
              ? response.body
              : null) ||
            response.statusText ||
            'Unknown API Error';

          throw new Error(errMsg);
        }

        await Actions.fireNotificationEvent(context, {
          summary: 'Schedule Update Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        $variables.rateSchName =
          $variables.scheduleRowData.rate_schedule;

        await Actions.callChain(context, {
          chain: 'CloseScheduleDataAction',
        });

      }

      catch (error) {

        const errorMessage =
          error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',

          headers: {
            R_TRACE_ID: $application.variables.traceIdDisplay || null,
            R_USER_NAME: $application.user.username,
            R_PAGE_NAME: page_name
          },

          body: {
            p_api_name: api_name,
            p_debug_message: errorMessage
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });

        return;
      }
    }
  }

  return SaveScheduleDataAction;
});