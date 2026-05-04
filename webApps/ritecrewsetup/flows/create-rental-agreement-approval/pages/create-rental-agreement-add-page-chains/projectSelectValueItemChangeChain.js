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

  class projectSelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (data) {

        const response = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05ProjectsProjectIdChildTasks2',
          uriParams: {
            ProjectId: data.projectId,
          },
        });

        $variables.tasksAdp.data = response.body.items;
        $variables.lineObj.projectname = data.projectName;
        $variables.lineObj.projectnumber = data.number;
        $variables.lineObj.projectid = data.projectId;
      }
    }
  }

  return projectSelectValueItemChangeChain;
});
