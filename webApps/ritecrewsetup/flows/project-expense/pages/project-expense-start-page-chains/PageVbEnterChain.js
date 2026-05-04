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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($application.variables.isDashboard) {
        $variables.eqpstatus = 'DEMOBILIZATION REQUESTED';
      }
      else{
        $variables.eqpstatus = 'REQUESTED';
        
      }

      await Actions.resetVariables(context, {
        variables: [
    '$application.variables.isDashboard',
  ],
      });
    }
  }

  return PageVbEnterChain;
});
