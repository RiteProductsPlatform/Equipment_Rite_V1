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

  class errorDiloagCloseButtonActionChain6 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const errorDilaogClose = await Actions.callComponentMethod(context, {
        selector: '#errorDilaog',
        method: 'close',
      });
    }
  }

  return errorDiloagCloseButtonActionChain6;
});
