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

  class divClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.current 
     */
    async run(context, { current }) {
      const { $page, $flow, $application, $variables } = context;

      const navigateToFlowCrewSetupResult = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'equipment-requisition',
      });
    }
  }

  return divClickChain;
});
