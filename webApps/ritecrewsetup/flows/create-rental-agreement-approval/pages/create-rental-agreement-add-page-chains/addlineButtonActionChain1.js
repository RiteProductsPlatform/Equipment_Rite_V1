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

  class addlineButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

let count = $variables.linesAdp.data.length || 0;
$variables.lineObj.id = count + 1
debugger;
      await Actions.fireDataProviderEvent(context, {
        target: $variables.linesAdp,
        add: {
          data: $variables.lineObj,
          indexes: $variables.lineObj.id,
        },
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.lineObj',
  ],
      });
    }
  }

  return addlineButtonActionChain1;
});
