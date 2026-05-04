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

  class SaveButtonActionChain extends ActionChain {

    /**

     * @param {Object} context

     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      let isSaved = true;


      let request_header_id;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPRite_ReqHeaderSubmit',
        body: {},
      });
      if (response.ok) {
        request_header_id = response.body.eqp_request_number;
      }
      if (request_header_id) {
        
        const results = await ActionUtils.forEach($variables.equipmentnewADP.data, async (item, index) => {
          
          item.eqp_request_number = response.body.eqp_request_number;
          item.equipment_type = $application.variables.equpdtls.equipment_type;
            item.equipment_id = null;
              item.equipment_number = null;
          item.non_labor_resource = $application.variables.equpdtls.non_labor_resource;
          item.non_labor_resource_org = $application.variables.equpdtls.non_labor_resource_org;
          
          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestCartSubmit',
            body: item,
          });

          // const response1 = await Actions.callRest(context, {
          //   endpoint: 'TimeRite_Ords_Service/postTestEQP_RequestPage',
          //   body: item,
          // });

          if (!response2.ok) {
            isSaved = false;
          }
        }, { mode: 'serial' });
        if (isSaved) {
          await Actions.fireNotificationEvent(context, {
            summary: "Equipment Request: " + request_header_id + " is submitted successfully ",
            type: 'confirmation',
            displayMode: 'transient',
          });
        }
        else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Save Failed',
            displayMode: 'transient',
            type: 'error',
          });
        }


      }


    }
  }

  return SaveButtonActionChain;

});

