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

  class InputTextValueChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, previousValue, value, updatedFrom, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const utilization2 = await $functions.getUtilization(value);
      $variables.templatepopup.p_utilization = utilization2;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.templateAdp,
        update: {
          data: $variables.templatepopup,
          indexes: [
      index,
    ],
          keys: [key],
        },
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.templatepopup',
  ],
      });
      
    }
  }

  return InputTextValueChangeChain1;
});
