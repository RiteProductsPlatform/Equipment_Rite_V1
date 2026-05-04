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

  class ButtonActionChain12 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      $variables.equipvariable_copy.id
        = $page.variables.equipnames.data.length === 0 ? 1
          : Math.max(...$page.variables.equipnames.data.map(obj => obj.id)) + 1;




      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipnames,
        add: {
          data: $variables.equipvariable_copy,
          keys: $variables.equipvariable_copy.id,
        },
      });
    }
  }

  return ButtonActionChain12;
});
