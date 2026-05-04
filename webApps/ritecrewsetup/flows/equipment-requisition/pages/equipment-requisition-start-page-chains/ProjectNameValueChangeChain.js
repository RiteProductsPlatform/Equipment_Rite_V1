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

  class ProjectNameValueChangeChain extends ActionChain {

    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      $variables.selectedRow.project_id = data.projectId;
      $variables.selectedRow.project_number = data.number;
      $variables.selectedRow.bu_id = data.orgId;
      $variables.selectedRow.bu_name = data.businessUnitName;

    const response =   await Actions.callRest(context, {
        endpoint: 'projectNameList/get11_13_18_05ProjectsProjectIdChildTasks2',
        uriParams: {
          ProjectId: $variables.selectedRow.project_id,
        },
      });

      $variables.TaskLovADP.data = $functions.uniquetasks(response.body.items);
     
    }
  }

  return ProjectNameValueChangeChain;
});

