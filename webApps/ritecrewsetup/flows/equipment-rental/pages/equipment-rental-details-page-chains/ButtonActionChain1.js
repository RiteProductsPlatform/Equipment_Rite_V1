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
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toEquipmentRental = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'equipment-rental',
      });
    }
  }

  return ButtonActionChain1;
});
