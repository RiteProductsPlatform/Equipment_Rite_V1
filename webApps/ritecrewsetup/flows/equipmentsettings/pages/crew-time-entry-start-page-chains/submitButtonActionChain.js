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

  class submitButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let FailedAPIName = '';

      try {

        const payloadfields2 = await $functions.getpayloadfields($variables.templatenames);

        FailedAPIName = 'postEQPRite_TemplateHeaderDetails';

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_TemplateHeaderDetails',
           headers: {
              'R_PAGE_NAME': 'equipmentsettings',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
          body: payloadfields2,
        });
        if (!response2.ok) {
          let errMsg =
            response2.body?.detail ||
            response2.body?.message ||
            (typeof response2.body === 'string' ? response2.body : null) ||
            response2.statusText ||
            'Unknown API Error';

          throw new Error(errMsg);
        }

        if (response2.ok) {


          let responsevariable = true;

          $variables.templateid = response2.body.p_template_id;

          const results = await ActionUtils.forEach($variables.templateAdp.data, async (item, index) => {

            //  debugger;
            item.p_utilization = $functions.getUtilization(item.p_total_capacity_perday);
            item.p_template_id = $variables.templateid;
            // item.p_equipment_number="";
            item.p_notes = "";
            item.p_last_updated_by = $application.variables.user || $application.user.username;
            item.p_eqp_serial_number = "";
            item.p_created_by = $application.variables.user || $application.user.username;


            FailedAPIName = 'postEQPRite_TemplateLinesDetails';

            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postEQPRite_TemplateLinesDetails',
               headers: {
              'R_PAGE_NAME': 'equipmentsettings',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
              body: item,
            });
            if (!response.ok) {
              responsevariable = false;

              let errMsg = response.body?.detail ||
                response.body?.message ||
                (typeof response.body === 'string' ? response.body : null) ||
                response.statusText ||
                'Unknown API Error';

              throw new Error(errMsg);
            }
            // if (!response.ok) {
            //   responsevariable = false;
            // }

          }, { mode: 'serial' });

          if (responsevariable) {
            await Actions.fireNotificationEvent(context, {
              displayMode: 'transient',
              type: 'confirmation',
              summary: 'Successfully created equipment',
            });

            const ojDialog9731887931Close = await Actions.callComponentMethod(context, {
              selector: '#oj-dialog-973188793-1',
              method: 'close',
            });
            await Actions.resetVariables(context, {
              variables: [
                '$variables.templatenames',
              ],
            });
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Create Equipment',
              displayMode: 'transient',
              type: 'error',
            });

          }
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Create Template Header',
            type: 'error',
            displayMode: 'transient',
          });

        }
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-reservations',
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": FailedAPIName,
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

  return submitButtonActionChain;
});
