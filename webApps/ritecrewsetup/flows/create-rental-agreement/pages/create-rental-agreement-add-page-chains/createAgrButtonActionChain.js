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

      let storeApiName;
      let errMsg;
      let pagename = 'Rental Agreement';
     
      const createagrLoadingOpen = await Actions.callComponentMethod(context, {
        selector: '#createagrLoading',
        method: 'open',
      });

       try {

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

        storeApiName = 'EQPRite_AgreementHeaders';

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_AgreementHeaders',
          body: createagrHdr,
          headers: {
              'R_PAGE_NAME': pagename,
              'R_TRACE_ID': $application.variables.traceIdDisplay || null,
              'R_USER_NAME': $application.user.username,
            },
        });

        if (!response.ok) {
               errMsg =
              response.body?.detail ||
              response.body?.message ||
              (typeof response.body === 'string' ? response.body : null) ||
              response.statusText ||
              'Unknown API Error';
            throw new Error(errMsg);
        }
 

        if (response.ok) {
          const results2 = await ActionUtils.forEach($variables.linesAdp.data, async (item, index) => {

            const createAgrLines = await $functions.createAgrLines(item, response.body.p_agreement_id);

            storeApiName = 'EQPRite_AgreementLines';
            
            const response2 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postEQPRite_AgreementLines',
              body: createAgrLines,
               headers: {
                'R_PAGE_NAME': pagename,
                'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                'R_USER_NAME': $application.user.username,
              },
            });

            if (!response2.ok) {
              errMsg =
              response2.body?.detail ||
              response2.body?.message ||
              (typeof response2.body === 'string' ? response2.body : null) ||
              response2.statusText ||
              'Unknown API Error';
            throw new Error(errMsg);
        }
 
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

      } catch (error) {

      const errorMessage = error?.message ||
    error?.body?.detail ||
    error?.body?.message||
      "Unknown API Error";

        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': pagename,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
            'p_api_name': storeApiName,
            'p_debug_message': errorMessage,
          },
        
        });

         await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });

 
       } finally {
      const createagrLoadingClose = await Actions.callComponentMethod(context, {
        selector: '#createagrLoading',
        method: 'close',
      });
    }
  }
  }
  return createAgrButtonActionChain;
});
