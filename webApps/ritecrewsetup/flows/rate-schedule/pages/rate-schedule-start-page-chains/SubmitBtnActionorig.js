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

  class SubmitBtnActionorig extends ActionChain {

    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $eq } = context;

      let eqp_rate_row_id = null;
      let api_name = "postInsertRateMaster";
      let page_name = "Create Rate Schedule";

      try {

        $variables.datavariables = false;

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postInsertRateMaster',

          headers: {
            R_TRACE_ID: $application.variables.traceIdDisplay,
            R_USER_NAME: $application.user.username,
            R_PAGE_NAME: page_name
          },

          body: {
            rate_schedule: $variables.RateSchDetailName,
            rs_description: 'Rate Schedule',
            bill_rate_schedule_level: $application.variables.billRateScheduleLevel,
            multi_currency_enabled: $variables.multiCurrencyEnabled,
            allow_location_based_diff: $variables.location_based_differential,
            allow_hours_type_rate_diff: $variables.hoursTypeRateDiff,
            active_flag: $variables.activeFlag[0] === 'Yes' ? 'Yes' : 'No',
            default_flag: $variables.defautFlag,

            start_date: $variables.startDate
              ? $application.functions.formatDate($variables.startDate)
              : '',

            end_date: $variables.endDate
              ? $application.functions.formatDate($variables.endDate)
              : '',

            contract: $variables.contract,
            project_number: $variables.projectNumber,
            task_number: $variables.taskNumber
          }
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


        api_name = "getRateSchNames";

        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getRateSchNames',

          requestTransformOptions: {
            filter: {
              op: '$eq',
              attribute: 'rate_schedule',
              value: $variables.RateSchDetailName,
            },
          },
        });

        if (
          !response3.ok ||
          !response3.body ||
          !response3.body.items ||
          response3.body.items.length === 0
        ) {
          throw new Error('Failed To Fetch Rate Schedule ID');
        }

        eqp_rate_row_id = response3.body.items[0].eqp_rate_row_id;

        if (!eqp_rate_row_id) {
          throw new Error('Invalid Rate Schedule ID');
        }


        api_name = "postInsertRateDetails";

        await ActionUtils.forEach(
          $variables.scheduleTblADP.data,

          async (item) => {

            const response2 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postInsertRateDetails',

              headers: {
                R_TRACE_ID: $application.variables.traceIdDisplay,
                R_USER_NAME: $application.user.username,
                R_PAGE_NAME: page_name
              },

              body: {
                rate_schedule_name: $variables.RateSchDetailName,
                non_labor_resource: $variables.NonLabourResource,
                location: $variables.selectedRow.location,
                addressline1: $variables.selectedRow.addressline1,
                addressline2: $variables.selectedRow.addressline2,
                city: $variables.selectedRow.city,
                country: $variables.selectedRow.country,
                zipcode: $variables.selectedRow.zipcode,
                longitude: $variables.selectedRow.longitude,
                latitude: $variables.selectedRow.latitude,

                uom: item.rate_period || '',
                rounding_threshold: item.threshold || '',

                rate_types: item.hour_type,
                cost_rate: item.cost_rate || '',
                bill_rate: item.bill_rate || '',
                currency: item.currency,

                rate_type_start_date: item.start_date
                  ? $application.functions.formatDate(item.start_date)
                  : '',

                rate_type_end_date: item.end_date
                  ? $application.functions.formatDate(item.end_date)
                  : '',

                equipment_resource_class: $variables.selectedEquipmentClass,
                eqp_rate_row_id: eqp_rate_row_id,
              }
            });

            if (!response2.ok) {

              let errMsg =
                response2.body?.detail ||
                response2.body?.message ||
                (typeof response2.body === 'string'
                  ? response2.body
                  : null) ||
                response2.statusText ||
                'Unknown API Error';

              throw new Error(errMsg);
            }

            $variables.datavariables = true;

          },

          { mode: 'serial' }
        );


        if ($variables.datavariables) {

          await Actions.navigateToPage(context, {
            page: 'rate-schedule-search',

            params: {
              rateSchName: $variables.RateSchDetailName,
            },
          });
        }


        await Actions.callComponentMethod(context, {
          selector: '#oj-dialog-1653737817-1',
          method: 'close',
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

  return SubmitBtnActionorig;
});