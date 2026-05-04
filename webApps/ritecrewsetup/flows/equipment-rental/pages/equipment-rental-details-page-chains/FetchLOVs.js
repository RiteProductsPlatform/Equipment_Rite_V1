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

  class FetchLOVs extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/EQPRentItemDetails',
          });

          if (!response.ok) {
          
            return;
          } else {
              const uniqueBuNames = await $functions.uniqueBuNames(JSON.stringify(response.body.items));

            const uniqueItemNames = await $functions.uniqueItemNames(JSON.stringify(response.body.items));

            $variables.BuADP.data = uniqueBuNames;
            $variables.itemNumberADP.data = uniqueItemNames;
          }
        },
      ].map(sequence => sequence()));

    }
  }

  return FetchLOVs;
});
