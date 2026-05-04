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

  class TR_TaskValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      if (data.task_name) {
        $page.variables.linesObj.task_id = data.task_id;
      } else {
         await Actions.resetVariables(context, {
           variables: [
             '$page.variables.linesObj.task_id',
           ],
         });
      }

    }
  }

  return TR_TaskValueChangeAction;
});
