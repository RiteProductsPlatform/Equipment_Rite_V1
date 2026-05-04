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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_AgreementHeaders',
      });

      if (response.ok) {
        if (true) {
          $variables.AgreementAdp.data = response.body.items;
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'No Data Found',
            type: 'info',
            displayMode: 'transient',
          });
        }
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Rental Agreements',
          type: 'error',
          displayMode: 'transient',
        });
        
      }

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_AgreementHeadFilters',
      });
        let uniqueCustomer = await $functions.removeDuplicates(
          response2.body.items,
          'customer_number'
        );
        let uniqueAgreementType = await $functions.removeDuplicates(
          response2.body.items,
          'agreement_type'
        );

        let uniqueStatus = await $functions.removeDuplicates(
          response2.body.items,
          'status_code'
        );

        $variables.customerLovADP.data = uniqueCustomer;
        $variables.agreementtypeadp.data = uniqueAgreementType;
        $variables.statusLovADP.data = uniqueStatus;



    }
  }

  return PageVbEnterChain;
});
