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

  class BooleanCheckboxComponentClickChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.multiCurrencyEnabled===undefined || $page.variables.multiCurrencyEnabled === 'No') {

        $page.variables.multiCurrencyEnabled = 'Yes';
      }

      if ($page.variables.multiCurrencyEnabled === 'Yes') {
        $page.variables.multiCurrencyEnabled = 'No';
      }
    }
  }

  return BooleanCheckboxComponentClickChain;
});
