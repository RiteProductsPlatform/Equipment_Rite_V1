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

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $flow, $application, $constants, $variables } = context;

          

      const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/eqpBillRateSchedulesLookup',
          });

          $variables.eqpRateScheduleAdp.data = response.body.items[0].lookupCodes;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05GenericLookups',
          });

          $variables.eqpClassAdp.data = response2.body.items[0].lookupCodes;
        },
        async () => {
          const response4 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getAllUOM',
          });
          $variables.uomAdp.data = response4.body.items;
        },




        async () => {
          const response2 = await Actions.callRest(context, {
        endpoint: 'fusion_cloud/getHoursTypeLookup',
      });

      $variables.eqpHoursTypeAdp.data = response2.body.items[0].lookupCodes;

      const response3 = await Actions.callRest(context, {
        endpoint: 'fusion_cloud/getCurrenciesLOV',
      });

      $variables.currencyAdp.data = response3.body.items;
        },
      ].map(sequence => sequence()));

    }
  }

  return vbEnterListener;
});
