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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if ($application.variables.isDashboard) {
        $variables.status ='ASSIGNED';
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
