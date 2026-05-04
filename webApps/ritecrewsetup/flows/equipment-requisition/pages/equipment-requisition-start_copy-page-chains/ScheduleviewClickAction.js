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

  class ScheduleviewClickAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      $application.variables.navAppReqToSchEqpClass = $variables.SearchObj.EquipmentClass ? $variables.SearchObj.EquipmentClass : "";

      const toCrewSchedule = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'crew-schedule',
      });

    }
  }

  return ScheduleviewClickAction;
});
