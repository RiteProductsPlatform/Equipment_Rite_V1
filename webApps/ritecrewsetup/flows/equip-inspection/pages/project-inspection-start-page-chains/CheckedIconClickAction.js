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

  class CheckedIconClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.current 
     */
    async run(context, { current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.groupedAdp,
        update: {
          data: current,
        },
      });

      await Actions.fireNotificationEvent(context, {
        summary: JSON.stringify($variables.groupedAdp.data),
      });
    }
  }

  return CheckedIconClickAction;
});
