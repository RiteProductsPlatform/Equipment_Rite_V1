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
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;
      const results = await Promise.all([
        async () => {
          const response7 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getEQPRite_AgreementSeq',
          });
          if(response7.ok){
           $variables.headerObj.AgreementNumber =  response7.body.items[0].agreement_number
          }
        },
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05ItemsLOV2',
            uriParams: {
              q: "ItemNumber!="+"'@@@'",
            },
          });

          $variables.itemLovAdp.data = response.body.items;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getAllUOM',
            uriParams: {
              limit: '500',
            },
          });

          $application.variables.uomAdp.data = response2.body.items;
        },
        async () => {
           const response3 = await Actions.callRest(context, {
             endpoint: 'fusion_cloud/getCurrenciesLOV',
           });

          $application.variables.currencyADP.data = response3.body.items;
        },
        async () => {
          const response6 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05FinBusinessUnitsLOV',
          });

          $variables.businessUnitAdp.data = response6.body.items;

          //  const response4 = await Actions.callRest(context, {
          //    endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05CustomerAccountSitesLOV2',
          //  });

          // $variables.customerSiteAdp.data = response4.body.items;
        },
        async () => {
          // const response5 = await Actions.callRest(context, {
          //   endpoint: 'fusion_cloud/getCrmRestApiResources11_13_18_05HubPersons2',
          //   uriParams: {
          //     limit: '500',
          //   },
          // });

          const response5 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05ShippingCustomersLOV',
          });

          $variables.customerAdp.data = response5.body.items;
        },
      ].map(sequence => sequence()));


    }
  }

  return PageVbEnterChain;
});
