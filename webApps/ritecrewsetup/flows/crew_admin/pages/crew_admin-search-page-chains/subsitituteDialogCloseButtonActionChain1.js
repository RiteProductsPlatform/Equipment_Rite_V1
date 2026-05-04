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

  class subsitituteDialogCloseButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const eqpSubstituteClose = await Actions.callComponentMethod(context, {
        selector: '#eqpSubstitute',
        method: 'close',
      });
    }
  }

  return subsitituteDialogCloseButtonActionChain1;
});
