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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.current
     */
    async run(context, { current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.selectedEqpQuoteAmount = 0;
      $variables.selectedEqpBillFreq = '';
      $variables.selectedEqpQuoteAmount = 0;
      $variables.selectedEquipmentNumber = current.equipment_number;
      const ojDialog5593265081Open = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--559326508-1',
        method: 'open',
      });
    }
  }

  return ButtonActionChain1;
});
