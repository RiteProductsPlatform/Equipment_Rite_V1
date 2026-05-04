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

  class ButtonActionChain7 extends ActionChain {

    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let api_name = "postEQPRite_ReqHeaderSubmit";
      let page_name = "Create Request ";

      try {

        if ($variables.payloadADP.data.length < 1) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Add Equipments',
          });
          return;
        }

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        api_name = "postEQPRite_ReqHeaderSubmit";

        const response5 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_ReqHeaderSubmit',

          headers: {
            R_TRACE_ID: $application.variables.traceIdDisplay,
            R_USER_NAME: $application.user.username,
            R_PAGE_NAME: page_name
          },

          body: {},
        });

        if (!response5.ok) {

          let errMsg =
            response5.body?.detail ||
            response5.body?.message ||
            (typeof response5.body === 'string'
              ? response5.body
              : null) ||
            response5.statusText ||
            'Unknown API Error';

          throw new Error(errMsg);
        }

        $variables.reqNumber = response5.body.eqp_request_number;

        api_name = "getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates";

        const response2 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
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

        const resourceRates = response2.body.items || [];

        $variables.isSubmittable = false;

        const results = await ActionUtils.forEach(
          $variables.payloadADP.data,

          async (item, index) => {

            const match = resourceRates.find(
              rate => rate.non_labor_resource_name === item.non_labor_resource
            );

            if (match) {

              item.bill_rate = await $functions.getDateDifference(
                item.start_date,
                item.end_date,
                match.rate,
                'days'
              );

              // if (match.rate_unit==="DY") {
              //   item.efforts_per_day = 1;
              // }

            }
            else {
              item.bill_rate = 0;
            }

            api_name = "postEQPRite_RequestCartSubmit";

            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestCartSubmit',

              headers: {
                R_TRACE_ID: $application.variables.traceIdDisplay,
                R_USER_NAME: $application.user.username,
                R_PAGE_NAME: page_name
              },

              body: item,
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

            $variables.response = !!response.ok;

          },

          { mode: 'serial' }
        );

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          type: 'confirmation',
          summary: $variables.reqNumber + " Submitted Successfully",
        });

        $variables.isSubmittable = true;

        if ($variables.response) {

          let obj = {
            "Message": "FYI - New request  " + $variables.reqNumber + "-" + "created in Equip Rite",
            "TaskCreator": $application.variables.user,
            "Role_Name": "OII Equipment Administrator"
          };

          api_name = "postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report";

          const response3 = await Actions.callRest(context, {
            endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',

            headers: {
              R_TRACE_ID: $application.variables.traceIdDisplay,
              R_USER_NAME: $application.user.username,
              R_PAGE_NAME: page_name
            },

            body: obj,
          });

          if (!response3.ok) {

            let errMsg =
              response3.body?.detail ||
              response3.body?.message ||
              (typeof response3.body === 'string'
                ? response3.body
                : null) ||
              response3.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }

          await Actions.navigateToFlow(context, {
            flow: 'equipment-reservations',
            target: 'parent',
            page: 'equipment-reservations-start',
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

  return ButtonActionChain7;
});