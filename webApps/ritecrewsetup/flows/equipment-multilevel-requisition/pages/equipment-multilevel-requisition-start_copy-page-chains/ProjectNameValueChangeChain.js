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

      $variables.selectedRowRequest.project_id = data.projectId;
      $variables.selectedRowRequest.project_number = data.number;
      $variables.selectedRowRequest.bu_id = data.orgId;
      $variables.selectedRowRequest.bu_name = data.businessUnitName;

      const results = await Promise.all([
        async () => {
          // const response = await Actions.callRest(context, {
          //   endpoint: 'projectNameList/get11_13_18_05ProjectsProjectIdChildTasks2',
          //   uriParams: {
          //     ProjectId: $variables.selectedRowRequest.project_id,
          //   },
          // });

          const response = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getProjectsProjectIdChildTasks',
            uriParams: {
              ProjectId: $variables.selectedRowRequest.project_id,
            },
          });

          $variables.TaskLovADP.data = await $functions.uniquetasks(response.body.items);
        },
        async () => {
          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getEqpSettings',
          });
          const result = response.body.items || [];
          const match = result.find(bu => bu.business_unit === data.businessUnitName);
          if (match.map_required === "N") {
            $variables.isMap = false;


          } else {
            $variables.isMap = true;

          }
        },
      ].map(sequence => sequence()));

    }
  }

  return ProjectNameValueChangeChain;
});
