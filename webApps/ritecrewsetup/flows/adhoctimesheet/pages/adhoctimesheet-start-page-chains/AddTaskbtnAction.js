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

  class AddTaskbtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.taskObj',
  ],
      });

      $variables.taskNum = $variables.taskNum + 1;
      $variables.taskObj.rownum = $variables.taskNum;

      // const response = await Actions.callRest(context, {
      //   endpoint: 'projectNameList/get11_13_18_05ProjectsProjectIdChildTasks2',
      // });

      // const uniqueTaskObj = await $functions.uniqueTaskObj(response.body.items);

      // $variables.taskLOVADP.data = uniqueTaskObj;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.taskTblADP,
        add: {
          data: $variables.taskObj,
        },
      });
    }
  }

  return AddTaskbtnAction;
});
