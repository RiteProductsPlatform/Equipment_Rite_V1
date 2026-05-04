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

  class intiateprocurementButtonActionChain extends ActionChain {

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

let pageName = 'equip-approval';


      try {

              const validateGroup = await $application.functions.validateGroup('povalid');

      if (validateGroup==="valid") {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const posaveobj = await $functions.posaveobj($variables.poVariables);

          storeApiName = 'putEquipmentMaster';

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEquipmentMaster',
          uriParams: {
            'p_equipment_id': $variables.eqpnums[0].equipment_id,
          },
          body: posaveobj,
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
        });

        if (!response.ok)
{
errMsg =response.body?.detail ||response.body?.message ||(typeof response.body === 'string' ? response.body : null) ||response.statusText ||'API Error';
throw new Error(errMsg);
}

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Procurement process initiated successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });

          const pOEditDialogClose = await Actions.callComponentMethod(context, {
            selector: '#POEditDialog',
            method: 'close',
          });
        }else{

          const pOEditDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#POEditDialog',
            method: 'close',
          });
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to initiate procurement process.',
            type: 'error',
            displayMode: 'transient',
          });
          
        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please fill all required fields',
          type: 'error',
          displayMode: 'transient',
        });
        
      }


      } catch (error) {
        let errMessage =
  error?.message ||
  error?.body?.detail ||
  error?.body?.message ||
  (typeof error?.body === 'string' ? error.body : null) ||
  JSON.stringify(error);
 
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
                'p_api_name': storeApiName,
                'p_debug_message':errMessage
        },
        });
 
        await Actions.fireNotificationEvent(context, {
          summary: 'ERROR',
          message: errMessage,
          displayMode: 'persist',
          type: 'error',
        });
		
      } finally {
                const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }

    }
  }

  return intiateprocurementButtonActionChain;
});
