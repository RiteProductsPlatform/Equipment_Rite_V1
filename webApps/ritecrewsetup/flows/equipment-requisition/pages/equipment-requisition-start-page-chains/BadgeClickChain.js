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

  class BadgeClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $applica } = context;

      $application.variables.navReqToSchEqpName = $variables.equipmentADP.data[index].equipment_id;
      $application.variables.navReqToSchEqpName = $variables.equipmentADP.data[index].equipment_id;      const toCrewSchedule = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'crew-schedule',
        params: {
          'url_access_type': 'REQUEST_FORM',
        },
      });
    }
  }

  return BadgeClickChain;
});
