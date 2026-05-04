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

  class SaveScheduleDetailsAction extends ActionChain {

    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let api_name = "putEqpRateScheduleDetailsUpdate";
      let page_name = "Equipment Rate Schedule";

      try {

        const startdate = await $application.functions.formatDate(
          $variables.ScheduleDetailsRowData.rate_type_start_date
        );

        const endDate = $application.functions.formatDate(
          $variables.ScheduleDetailsRowData.rate_type_end_date
        );

        const saveRateSchedule = await $functions.saveRateSchedule(
          $variables.ScheduleDetailsRowData,
          startdate,
          endDate
        );

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEqpRateScheduleDetailsUpdate',

          headers: {
            R_TRACE_ID: $application.variables.traceIdDisplay,
            R_USER_NAME: $application.user.username,
            R_PAGE_NAME: page_name
          },

          body: saveRateSchedule,
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

        const response1 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',

          uriParams: {
            'p_eqp_rate_row_id': $variables.headerObj.eqp_rate_row_id,
          },
        });

        if (response1.ok) {

          $variables.billrateSchedulesDetailsAdp.data =
            response1.body.items;

          await Actions.fireDataProviderEvent(context, {
            target: $variables.billrateSchedulesDetailsAdp,
            refresh: null,
          });

          if (response1.body.items.length > 0) {
            $variables.valueObj =
              response1.body.items[0];
          }
        }

        await Actions.fireNotificationEvent(context, {
          summary: 'Schedule Details updated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.callChain(context, {
          chain: 'CloseScheduleDetailsAction',
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

  return SaveScheduleDetailsAction;
});