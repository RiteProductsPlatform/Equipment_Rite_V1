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

  class AddRateDetailsButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
// debugger;
      await Actions.resetVariables(context, {
        variables: [
    '$variables.rateDeatilsAdp.data',
  ],
      });

      const ratedetailsOpen = await Actions.callComponentMethod(context, {
        selector: '#ratedetails',
        method: 'open',
      });
    }
  }

  return AddRateDetailsButtonActionChain;
});
