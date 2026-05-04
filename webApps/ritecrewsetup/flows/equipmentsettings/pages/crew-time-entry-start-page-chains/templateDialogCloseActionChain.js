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

  class templateDialogCloseActionChain extends ActionChain {

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
    '$variables.templateEqpAdp.data',
    '$variables.gettemplateadp',
  ],
      });

      const templateClose = await Actions.callComponentMethod(context, {
        selector: '#template',
        method: 'close',
      });
    }
  }

  return templateDialogCloseActionChain;
});
