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

  class SaveButtonActionChain2 extends ActionChain {

    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let responsevar;
      let api_name = "postInsertRateDetails";
      let page_name = "Equipment Rate Schedule";

      try {

        if ($variables.rateDeatilsAdp.data.length > 0) {

          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });

          const result = await $functions.getUnmatchedFromArr2(
            $variables.billrateSchedulesDetailsAdp.data,
            $variables.rateDeatilsAdp.data
          );

          if (result) {

            await ActionUtils.forEach(result, async (item, index) => {

              const saveRateScheduleDetails =
                await $functions.saveRateScheduleDetails(
                  item,
                  $variables.headerObj.eqp_rate_row_id,
                  $variables.valueObj
                );

              const response = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/postInsertRateDetails',

                headers: {
                  R_TRACE_ID: $application.variables.traceIdDisplay,
                  R_USER_NAME: $application.user.username,
                  R_PAGE_NAME: page_name
                },

                body: saveRateScheduleDetails,
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

              responsevar = response;

            }, { mode: 'serial' });

            if (responsevar.ok) {

              await Actions.fireNotificationEvent(context, {
                summary: 'Bill rate schedule details were saved successfully',
                type: 'confirmation',
                displayMode: 'transient',
              });

              const response2 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',

                uriParams: {
                  'p_eqp_rate_row_id': $variables.headerObj.eqp_rate_row_id,
                },
              });

              $variables.billrateSchedulesDetailsAdp.data =
                response2.body.items;

              await Actions.fireDataProviderEvent(context, {
                target: $variables.billrateSchedulesDetailsAdp,
                refresh: null,
              });

              await Actions.callComponentMethod(context, {
                selector: '#ratedetails',
                method: 'close',
              });

              await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

            }

          } else {

            await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Entered records are already present in the rate schedule details.',
              displayMode: 'transient',
              type: 'error',
            });
          }

        } else {

          await Actions.fireNotificationEvent(context, {
            summary: 'No Data To Save',
            type: 'error',
            displayMode: 'transient',
          });
        }

      }

      catch (error) {

        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

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

  return SaveButtonActionChain2;
});