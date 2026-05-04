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

  class backToRentalsPage extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

       $variables.iscart=  $variables.iscart ? false: true 

      // ---- TODO: Add your code here ---- //
    }
  }

  return backToRentalsPage;
});
