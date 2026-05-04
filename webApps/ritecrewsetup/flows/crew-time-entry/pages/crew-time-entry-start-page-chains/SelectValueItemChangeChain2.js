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
      const { $page, $flow, $application, $constants, $variables } = context;

      if($variables.searchobj.requestnumber) {
        $variables.cartNumberBoolean = true;

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.cartNumber',
  ],
        });
        
      }else{
        $variables.cartNumberBoolean = false;

      }
    }
  }

  return SelectValueItemChangeChain2;
});
