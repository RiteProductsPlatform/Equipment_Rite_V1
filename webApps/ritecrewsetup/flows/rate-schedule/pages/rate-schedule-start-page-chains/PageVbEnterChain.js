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
     */
    async run(context) {
      const { $page, $flow, $application, $variables } = context;

      $page.variables.location_based_differential = undefined;

      // const response = await Actions.callRest(context, {
      //   endpoint: 'businessObjects/getall_HoursType',
      // });

      // $variables.allHourTypes = response.body.items;

      const response2 = await Actions.callRest(context, {
        endpoint: 'fusion_cloud/getHoursTypeLookup',
      });

      $variables.eqpHoursTypeAdp.data = response2.body.items[0].lookupCodes;

      const response3 = await Actions.callRest(context, {
        endpoint: 'fusion_cloud/getCurrenciesLOV',
      });

      $variables.currencyAdp.data = response3.body.items;
    }
  }

  return PageVbEnterChain;
});
