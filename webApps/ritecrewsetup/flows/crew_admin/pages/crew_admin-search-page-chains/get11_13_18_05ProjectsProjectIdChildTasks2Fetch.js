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

  class get11_13_18_05ProjectsProjectIdChildTasks2Fetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'projectNameList/get11_13_18_05ProjectsProjectIdChildTasks2',
        uriParams: {
          ProjectId: $variables.RowData.project_id,
        },
        responseType: 'get1113185ProjectsProjectIdChildTasks2Response',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return get11_13_18_05ProjectsProjectIdChildTasks2Fetch;
});
