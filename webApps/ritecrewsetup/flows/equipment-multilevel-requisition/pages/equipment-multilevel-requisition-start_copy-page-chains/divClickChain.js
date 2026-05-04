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

  class divClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.current
     */
    async run(context, { event, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const loadOpen = await Actions.callComponentMethod(context, {
        selector: '#load',
        method: 'open',
      });

       $variables.selectedRow = current;


    const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/AssetMaintCost',
            uriParams: {
              'p_asset_number': $variables.selectedRow.asset_number,
            },
          });

          $variables.workordercostArray = response.body.items;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/AssetFACost',
            uriParams: {
              'p_asset_number': $variables.selectedRow.asset_number,
            },
          });

          $variables.FACostArray = response2.body.items;
        },
        async () => {
          await Actions.resetVariables(context, {
            variables: [
    '$variables.eqpSubstituteAdp.data',
  ],
          });

           const response3 = await Actions.callRest(context, {
             endpoint: 'TimeRite_Ords_Service/getEQPRite_SubstituteDetails',
             uriParams: {
               'p_parent_equipment_id':  $variables.selectedRow.equipment_id,
             },
           });

          $variables.eqpSubstituteAdp.data = response3.body.items;
        },
        async () => {
          await Actions.resetVariables(context, {
            variables: [
    '$variables.eqpPairingAdp.data',
  ],
          });

          const response4 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getEQPRite_SuggestionDetails',
            uriParams: {
              'p_parent_equipment_id':  $variables.selectedRow.equipment_id,
            },
          });

          $variables.eqpPairingAdp.data = response4.body.items;
        },
      ].map(sequence => sequence()));

      const requestdetailsOpen = await Actions.callComponentMethod(context, {
        selector: '#requestdetails',
        method: 'open',
      });

      const loadClose = await Actions.callComponentMethod(context, {
        selector: '#load',
        method: 'close',
      });
    }
  }

  return divClickChain;
});
