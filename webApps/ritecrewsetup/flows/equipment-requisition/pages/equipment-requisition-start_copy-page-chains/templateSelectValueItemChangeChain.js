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

  class templateSelectValueItemChangeChain extends ActionChain {

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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

     

      $variables.SearchObj.template_id = data.template_id;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_CRTemplateLines',
        uriParams: {
          'p_template_id': data.template_id,
        },
      });

      if (response.ok) {

        const addProject = await $functions.addProject(response.body.items, $variables.requestObj, $variables.selectedTaskName, $variables.SearchObj, $variables.invLocationObj, $variables.projectName, $variables.selectedbuname, $variables.selectedBuid, $application.variables.user  || $application.user.username);
// debugger;
        $variables.payloadADP.data = addProject;
      }
    }
  }

  return templateSelectValueItemChangeChain;
});
