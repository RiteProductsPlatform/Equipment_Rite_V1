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

  class SaveLineButtonActionChain extends ActionChain {

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

      const validateGroup = await $application.functions.validateGroup('lineValidation');

      if (validateGroup==="valid") {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

         try {

        const createAgrLines = await $functions.createAgrLines($variables.addlineObj, $variables.selectedRow.agreement_id);
         
         storeApiName =   'postEQPRite_AgreementLines';

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_AgreementLines',
          body: createAgrLines,
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
          await Actions.fireNotificationEvent(context, {
            summary: 'Data saved successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });

          
             const response1 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getEQPRite_AgreementLines',
            uriParams: {
              'p_agreement_id': $variables.selectedRow.agreement_id ,
            },
          });

          $variables.linesAdp.data = response1.body.items;
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to save data',
            type: 'error',
            displayMode: 'transient',
          });
          
        }

         } catch (error) {

          const errorMessage =
            error?.message ||
            error?.body?.detail ||
            error?.body?.message ||
            "Unknown API Error";

          const response2 = await Actions.callRest(context, {
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

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
          }
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please fill all required fields',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }
  return SaveLineButtonActionChain;
});
