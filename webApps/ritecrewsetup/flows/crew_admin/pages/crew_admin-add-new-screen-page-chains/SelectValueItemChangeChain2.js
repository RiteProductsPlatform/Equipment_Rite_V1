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

  class SelectValueItemChangeChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      // if (data.eqType === "Leased") {

      //   const insertIndex = $page.variables.navigationData.length - 1;

      //   // $page.variables.navigationData.push(
      //   //   {
      //   //     "name": "Leasing",
      //   //     "id": "page-leasing"
      //   //   }
      //   // );
      //   // Insert the object at the calculated position
      //   $page.variables.navigationData.splice(insertIndex, 0, {
      //     "name": "Leasing",
      //     "id": "page-leasing"
      //   });
      // } else {
      //   await Actions.resetVariables(context, {
      //     variables: [
      //       '$page.variables.navigationData',
      //     ],
      //   });
      // }
    }
  }

  return SelectValueItemChangeChain2;
});
