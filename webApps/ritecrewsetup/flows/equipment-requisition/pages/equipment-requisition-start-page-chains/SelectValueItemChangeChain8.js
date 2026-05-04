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

  class SelectValueItemChangeChain8 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.requestObj.projectId = data.projectId;
      $variables.requestObj.projectNumber = data.number;
      $variables.projectName = data.projectName;
      $variables.selectedBuid = data.orgId;
      $variables.selectedbuname = data.businessUnitName;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpSettings',
      });
      const result = response.body.items || [];
     const match = result.find(bu => bu.business_unit === data.businessUnitName);
      if (match.map_required==="N") {
        $variables.isMap = false;
        
        
      }else{
        $variables.isMap = true;
        
      }
    }
  }

  return SelectValueItemChangeChain8;
});
