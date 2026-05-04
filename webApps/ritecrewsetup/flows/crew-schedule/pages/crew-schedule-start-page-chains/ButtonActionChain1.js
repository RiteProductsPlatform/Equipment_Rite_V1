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
     * @param {any} params.selectedCrewId 
     */
    async run(context, { selectedCrewId }) {
      const { $page, $flow, $application } = context;

      const navigateToFlowCrewSetupResult = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'crew-setup',
        page: 'crew-setup-start',
        params: {
          searchCrew: $page.variables.selectedCrewName,
        },
      });
    }
  }

  return ButtonActionChain1;
});
