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

  class LinesProjectChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     * @param {any} params.event 
     */
    async run(context, { key, data, metadata, event }) {
      const { $page, $flow, $application } = context;
      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.linesObj.project_id',
        ],
      });

      $page.variables.linesObj.project_id = data.ProjectId;

      const callFunctionResult = await $page.functions.printConsole(data);
    }
  }

  return LinesProjectChangeAction;
});
