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

  class UpdateButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.linesAdp,
        update: {
          data: $variables.lineObj,
          indexes: $variables.lineObj.id,
        },
      });

      const popClose = await Actions.callComponentMethod(context, {
        selector: '#pop',
        method: 'close',
      });
    }
  }

  return UpdateButtonActionChain;
});
