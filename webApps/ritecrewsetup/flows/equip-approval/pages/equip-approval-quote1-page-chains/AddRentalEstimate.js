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

  class AddRentalEstimate extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context, { current}) {
      const { $page, $flow, $application, $constants, $variables } = context;
      $variables.selectedEqpQuoteAmount = 0;
      $variables.selectedEqpBillFreq = '';
      $variables.selectedEqpQuoteAmount = 0;
      $variables.selectedEquipmentNumber = current.equipment_number;
      $variables.selectedEquipment.equipment_id = current.equipment_id;
      $variables.selectedEquipment.equipmentNumber = current.equipment_number;
      $variables.selectedEquipment.equipmentName = current.equipment_name;
      const ojDialog5593265081Open = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--559326508-1',
        method: 'open',
      });


    }
  }

  return AddRentalEstimate;
});
