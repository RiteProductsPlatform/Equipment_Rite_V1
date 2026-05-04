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

  class updateTimesheetButtonActionChainNew extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

let storeApiName;
let errMsg;
let pageName = 'crew-time-entry';

      try {
        
      const validateGroup = await $application.functions.validateGroup('updateSearchformvalidation');

      if (validateGroup === "valid") {
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response1 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
        });

        if (response1.ok) {
const result = response1.body.items || [];
        const match = result.find(rate => rate.non_labor_resource_name === $variables.projectBasedRowData.non_labor_resource);

          if (match) {

            $variables.projectBasedRowData.p_nonlabor_resource_rate_unit = match.rate_unit;

            storeApiName = 'putEquipAssignmentData';

            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/putEquipAssignmentData',
              body: $variables.projectBasedRowData,
              headers: {
                'R_PAGE_NAME': pageName,
                'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                'R_USER_NAME': $application.user.username,
              },
            });

            if (!response.ok) {
 
  errMsg =
    response.body?.detail ||
    response.body?.message ||
    (typeof response.body === 'string' ? response.body : null) ||
    response.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}

            if (response.ok) {
              const loadingDialogClose = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.resetVariables(context, {
                variables: [
    '$variables.selectedKey',
  ],
              });

              await Actions.callChain(context, {
                chain: 'SearchButtonAction_New',
              });

              const timesDialogClose = await Actions.callComponentMethod(context, {
                selector: '#timesDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                summary: 'TimeSheet updated Successfully',
                type: 'confirmation',
                displayMode: 'transient',
              });
            } else {
              const loadingDialogClose2 = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                summary: 'Failed To Update Timesheet',
                type: 'error',
                displayMode: 'transient',
              });

            }
          }
        }

        
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Fill All Required Fields Before Update',
          type: 'error',
          displayMode: 'transient',
        });

      }

      } catch (error) {
        let errMessage =
  error?.message ||
  error?.body?.detail ||
  error?.body?.message ||
  (typeof error?.body === 'string' ? error.body : null) ||
  JSON.stringify(error);
 
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
                'p_api_name': storeApiName,
                'p_debug_message':errMessage
        },
        });
 
        await Actions.fireNotificationEvent(context, {
          summary: 'ERROR',
          message: errMessage,
          displayMode: 'persist',
          type: 'error',
        });

      } finally {
                      const loadingDialogClose2 = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });
      }
    }
  }

  return updateTimesheetButtonActionChainNew;
});
