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

  class SelectValueItemChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if(data){
      $variables.customerNumber = data.customerNumber;
      $variables.customerName = data.customerName;
      }

    }
  }

  return SelectValueItemChangeChain1;
});
