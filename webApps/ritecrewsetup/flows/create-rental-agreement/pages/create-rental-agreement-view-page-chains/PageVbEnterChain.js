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

      const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getEQPRite_AgreementLines',
            uriParams: {
              'p_agreement_id': $variables.selectedRow.agreement_id ,
            },
          });

          $variables.linesAdp.data = response.body.items;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getAllUOM',
          });

          $variables.uomAdp.data = response2.body.items;
        },
        async () => {
          const response3 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getCurrenciesLOV',
          });

          $variables.curencyAdp.data = response3.body.items;
        },
      ].map(sequence => sequence()));
    }
  }

  return PageVbEnterChain;
});
