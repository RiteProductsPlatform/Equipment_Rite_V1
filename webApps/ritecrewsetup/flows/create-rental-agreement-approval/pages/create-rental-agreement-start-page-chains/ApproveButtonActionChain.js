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

  class ApproveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let api_name = "putEQPRite_AgreementHeaders";
      let page_name = "Approve Agreement";

      try {

        let isSuccess = true;

        if ($variables.approveData.length !== 0) {

          const results = await ActionUtils.forEach(
            $variables.approveData,

            async (item, index) => {

              const response = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/putEQPRite_AgreementHeaders',

                headers: {
                  R_TRACE_ID: $application.variables.traceIdDisplay,
                  R_USER_NAME: $application.user.username,
                  R_PAGE_NAME: page_name
                },

                uriParams: {
                  'p_agreement_id': item.agreement_id,
                },
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

                isSuccess = false;

                throw new Error(errMsg);
              }

            },

            { mode: 'serial' }
          );
        }

        if (isSuccess) {

          await Actions.fireNotificationEvent(context, {
            summary: 'Agreement Approved Successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });

          await Actions.callChain(context, {
            chain: 'SearchButtonActionChain',
          });

        }
        else {

          await Actions.fireNotificationEvent(context, {
            summary: 'Agreement Approval Failed',
            type: 'error',
            displayMode: 'transient',
          });

        }

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

  return ApproveButtonActionChain;
});