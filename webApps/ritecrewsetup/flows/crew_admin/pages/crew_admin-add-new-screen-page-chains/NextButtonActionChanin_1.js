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

  class NextButtonActionChanin_1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;
      // if($page.variables.currentSelctedVal === "page-core")
      // {
      // $page.variables.currentFlow = "page-assets";
      // $page.variables.selectedVal = "page-assets";  
      // }
      // else if($page.variables.currentSelctedVal === "page-assets")
      // {
      //   $page.variables.currentFlow = "page-manufaturer";
      // $page.variables.selectedVal = "page-manufaturer";  
      // }
      // else if($page.variables.currentSelctedVal === "page-manufaturer")
      // {
      //   $page.variables.currentFlow = "page-location";
      // $page.variables.selectedVal = "page-location";  
      // }
      // else if($page.variables.currentSelctedVal === "page-location")
      // {
      //   $page.variables.currentFlow = "page-leasing";
      // $page.variables.selectedVal = "page-leasing";  
      // }
      // else if($page.variables.currentSelctedVal === "page-leasing")
      // {
      //   $page.variables.currentFlow = "page-costing";
      // $page.variables.selectedVal = "page-costing";  
      // }
      $page.variables.currentFlow = "page-assets";
      $page.variables.selectedVal = "page-assets";
      console.log("current dlow is");
      console.log($page.variables.currentFlow)
    }
  }

  return NextButtonActionChanin_1;
});
