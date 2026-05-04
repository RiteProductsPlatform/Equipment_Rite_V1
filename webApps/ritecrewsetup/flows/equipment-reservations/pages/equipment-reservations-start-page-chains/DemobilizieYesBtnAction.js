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

  class DemobilizieYesBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const FailedAPIName = '';

      try {

        const validateGroup = await $application.functions.validateGroup('demobilizeVal');
        // debugger;
        if (validateGroup === 'valid') {
          const formatDate = await $application.functions.formatDate($variables.demobilizeobj.p_disband_date);
          // const response = await Actions.callRest(context, {
          //   endpoint: 'TimeRite_Ords_Service/CreateEqpAcceptancePrj',
          //   uriParams: {
          //     'p_equipment_class': $variables.selectionrow.equipment_resource_class,
          //     'p_eqp_request_number': $variables.selectionrow.eqp_request_number,
          //     'p_equipment_id': $variables.selectionrow.equipment_id,
          //     'p_disband_date': formatDate,
          //     'p_comments': $variables.demobilizeobj.p_comments,
          //   },
          // });

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/CreateEqpAcceptancePrj',
            uriParams: {
              'p_equipment_class': $variables.selectionrow.equipment_resource_class,
              'p_eqp_request_number': $variables.selectionrow.eqp_request_number,
              'p_equipment_id': $variables.selectionrow.equipment_id,
              'p_disband_date': formatDate,
              'p_comments': $variables.demobilizeobj.p_comments,
            },
            headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-reservations',
            'R_USER_NAME': $application.user.username,
          },
          });
          
          if (!response.ok) {
            let errMsg =
              response.body?.detail ||
              response.body?.message ||
              (typeof response.body === 'string' ? response.body : null) ||
              response.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }

          if (response.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Demobilization Initiated Successfully',
              displayMode: 'transient',
              type: 'confirmation',
            });

            const demobilizeDlgClose = await Actions.callComponentMethod(context, {
              selector: '#demobilizeDlg',
              method: 'close',
            });
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to Initiate Demobilization',
              displayMode: 'transient',
            });
            return;
          }
        }
        // }, { mode: 'serial' });
        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });
      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-reservations',
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": 'CreateEqpAcceptancePrj',
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

  return DemobilizieYesBtnAction;
});
