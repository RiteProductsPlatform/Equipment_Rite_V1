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

  class SelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;

      $page.variables.AssetsTabObj.project_number = data.ProjectNumber;
      $page.variables.AssetsTabObj.project_name = data.ProjectName;

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/get11_13_18_05ProjectsProjectIdChildTasks2',
        uriParams: {
          ProjectId: $variables.AssetsTabObj.project_id,
        },
      });

      $variables.getTaskDetailsADP.data = response.body.items;
    }
  }

  return SelectValueItemChangeChain;
});
