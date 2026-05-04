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

  class SelectValueItemChangeChain5 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.cartNumber) {
        $variables.requestNumberBoolean = true;

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.requestnumber',
  ],
        });
      }else{
        $variables.requestNumberBoolean = false;
        
      }
    }
  }

  return SelectValueItemChangeChain5;
});
