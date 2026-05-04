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

  class FlexClickChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toEquipmentReservations = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'equipment-reservations',
      });

      $application.variables.isDashboard = true;
    }
  }

  return FlexClickChain1;
});
