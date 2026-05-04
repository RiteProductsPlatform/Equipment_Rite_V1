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

  class NexButtonLocationActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;
        if($page.variables.MasterTabObj.equipment_Type == "Leased")
        {
          $page.variables.currentFlow = "page-leasing";
        $page.variables.selectedVal = "page-leasing";
        }
        else{
          $page.variables.currentFlow = "page-costing";
        $page.variables.selectedVal = "page-costing";
        }
        
    }
  }

  return NexButtonLocationActionChain;
});
