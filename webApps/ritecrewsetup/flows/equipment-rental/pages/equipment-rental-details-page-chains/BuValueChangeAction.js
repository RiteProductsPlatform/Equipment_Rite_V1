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

  class BuValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      $variables.CreatePoObj.bu_id = data.business_unit_id;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/RentRequestorDetails',
        uriParams: {
          'p_proc_bu': data.business_unit_name,
        },
      });

      if (!response.ok) {
      
        return;
      } else {
         const uniquepersonNames = await $functions.uniquepersonNames(JSON.stringify(response.body.items));

        $variables.PersonNameADP.data = uniquepersonNames;
      }
    }
  }

  return BuValueChangeAction;
});
