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

  class createAgrButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
     
      const createagrLoadingOpen = await Actions.callComponentMethod(context, {
        selector: '#createagrLoading',
        method: 'open',
      });

      let agreementtermsVal;
      let customerVal;
      let agreementVal;
      const results = await Promise.all([
        async () => {

          const validateGroup = await $application.functions.validateGroup('agreement');

          agreementVal = validateGroup;
        },
        async () => {

          const validateGroup2 = await $application.functions.validateGroup('customer');

          customerVal = validateGroup2;
        },
        async () => {
          const validateGroup3 = await $application.functions.validateGroup('agreementterms');

          agreementtermsVal = validateGroup3;
        },
      ].map(sequence => sequence()));

      if (agreementVal === "valid" && customerVal === "valid" && agreementtermsVal === "valid") {
        //  if (true) {
        let createagrHdr = await $functions.createagrHdr($variables.headerObj);



        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_AgreementHeaders',
          body: createagrHdr,
        });

        if (response.ok) {
          const results2 = await ActionUtils.forEach($variables.linesAdp.data, async (item, index) => {

            const createAgrLines = await $functions.createAgrLines(item, response.body.p_agreement_id);

            const response2 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postEQPRite_AgreementLines',
              body: createAgrLines,
            });
          }, { mode: 'serial' });

          await Actions.fireNotificationEvent(context, {
            summary: 'Rental agreement created',
            type: 'confirmation',
            displayMode: 'transient',
          });

          const toDefaultPage = await Actions.navigateToPage(context, {
            page: 'create-rental-agreement-start',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to create rental agreement',
            type: 'error',
            displayMode: 'transient',
          });

        }

      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please fill all required fields',
          type: 'error',
          displayMode: 'transient',
        });

      }

      const createagrLoadingClose = await Actions.callComponentMethod(context, {
        selector: '#createagrLoading',
        method: 'close',
      });
    }
  }

  return createAgrButtonActionChain;
});
