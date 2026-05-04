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

  class vbEnterChangeListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables } = context;

      const callFunctionResult = await this.refreshScreenFunc(context);

      $variables.selectedEquipmentClass = $application.variables.navAppReqToSchEqpClass?$application.variables.navAppReqToSchEqpClass:'';
      $variables.selectedEquipmentName = $application.variables.navReqToSchEqpName?$application.variables.navReqToSchEqpName:'';

      await Actions.callChain(context, {
        id: 'searchActionChain',
      });
    }

    /**
     * @param {Object} context
     */
    async refreshScreenFunc(context) {
      const { $page, $flow, $application } = context;
    
    }
  }

  return vbEnterChangeListener;
});
