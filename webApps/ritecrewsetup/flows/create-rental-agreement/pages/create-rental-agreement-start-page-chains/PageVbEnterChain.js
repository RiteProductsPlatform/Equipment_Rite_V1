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

      const removeDuplicates = await $functions.removeDuplicates(response2.body.items);

      $variables.customeradp.data = removeDuplicates;

       const response3 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_AgreementHeadFilters',
      });

const removeDuplicates2 = await $functions.removeDuplicates2(response3.body.items);

    $variables.agreementtype.data = removeDuplicates2;

      const response4 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_AgreementHeadFilters',
      });

      const removeDuplicates3 = await $functions.removeDuplicates3(response4.body.items);

      $variables.statusadp.data = removeDuplicates3;

  


    }
  }

  return PageVbEnterChain;
});
