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

  class BadgeClickChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $application.variables.navAppReqToSchEqpClass = $variables.eqpClass;
      $application.variables.navReqToSchEqpName = $variables.tableADP.data[index].equipment_name;
      $application.variables.navReqToSchReqName = $variables.tableADP.data[index].requestor_name;

      const toCrewSchedule = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'crew-schedule',
      });
    }
  }

  return BadgeClickChain2;
});
