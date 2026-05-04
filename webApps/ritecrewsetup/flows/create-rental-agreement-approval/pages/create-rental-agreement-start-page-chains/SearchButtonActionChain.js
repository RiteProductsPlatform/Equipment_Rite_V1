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

  class SearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.AgreementAdp.data',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_AgreementHeaders',
        uriParams: {
          'p_agreement_number': $variables.searchObj.agreementNumber||"",
          'p_agreement_type_code': $variables.searchObj.agreementType||"",
          'p_customer_id': $variables.searchObj.customerID||"",
          'p_status_code': $variables.searchObj.status||"",
        },
      });

      if (response.ok) {
        if (response.body.items.length>0) {

          $variables.AgreementAdp.data = response.body.items;
        } else {
           await Actions.fireNotificationEvent(context, {
             summary: 'No data found',
             type: 'info',
             displayMode: 'transient',
           });
        }

      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch data',
          type: 'error',
          displayMode: 'transient',
        });
      }
    }
  }

  return SearchButtonActionChain;
});
