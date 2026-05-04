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

  class InputNumberValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables } = context;
 await Actions.resetVariables(context, {
        variables: [
    '$page.variables.selectedEqpBillFreq',
    '$page.variables.selectedEqpTaxAmount',
    '$page.variables.selectedEqpQuoteAmount',
  ],
      });

      $variables.selectedEqpQuoteAmount = value;

      $variables.selectedEqpTaxAmount = value*0.0825;

    }
  }

  return InputNumberValueChangeChain;
});
