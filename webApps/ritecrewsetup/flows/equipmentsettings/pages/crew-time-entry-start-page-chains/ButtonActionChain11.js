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

  class ButtonActionChain11 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

            await Actions.resetVariables(context, {
        variables: [
    '$variables.templateAdp.data',
    '$variables.templateAdp',
  ],
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.templatenames',
  ],
      });

      const ojDialog9731887931Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-973188793-1',
        method: 'close',
      });
    }
  }

  return ButtonActionChain11;
});
