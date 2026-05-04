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

  class closeEditContractDialoge extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.defaultCheck = false;

      const callComponentMethodEditContractDetailsCloseResult = await Actions.callComponentMethod(context, {
        selector: '#editContractDetails',
        method: 'close',
      });
    }
  }

  return closeEditContractDialoge;
});
