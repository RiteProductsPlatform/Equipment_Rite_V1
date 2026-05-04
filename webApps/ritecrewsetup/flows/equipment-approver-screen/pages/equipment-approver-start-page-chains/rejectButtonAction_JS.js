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

  class rejectButtonAction_JS extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions, $current } = context;

      let FailedAPIName = '';

      try {

        const results = await ActionUtils.forEach($page.variables.FilteredData, async (item, index) => {

          const createRejectReq = await $functions.createRejectReq(item);

          FailedAPIName = 'putOrdsTimeriteEQPRITETESTEqpSubmitTimeEntry';

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/putEqpSubmitTimeEntry',
            headers: {
              'R_PAGE_NAME': 'equipment-approver-screen',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
            body: createRejectReq,
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
                  target: 'leaf',
                  summary: 'Reject is Success',
                  type: 'confirmation',
                  displayMode: 'transient'
                });
          }
        }, { mode: 'serial' });
      } catch (error) {
        const errorMessage = error?.message ||
    error?.body?.detail ||
    error?.body?.message||
      "Unknown API Error"; 

        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'equipment-approver-screen',
			'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          body: {
         "p_api_name": 'postOrdsTimeriteEQPRITETESTEQPRite_ClassSettings',
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

  return rejectButtonAction_JS;
});
