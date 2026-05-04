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

  class yesButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const frequentClose = await Actions.callComponentMethod(context, {
        selector: '#frequent',
        method: 'close',
      });

      await Actions.callChain(context, {
        chain: 'DetailsiconClickAction',
        params: {
          current: $variables.selectedRow,
        },
      });
    }
  }

  return yesButtonActionChain;
});
