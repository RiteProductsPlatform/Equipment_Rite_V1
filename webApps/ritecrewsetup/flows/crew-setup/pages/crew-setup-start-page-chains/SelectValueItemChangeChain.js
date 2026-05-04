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
      const { $page, $flow, $application } = context;

      if (data) {
        if (data.value=== "NON PROJECT SPECIFIC") {
          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.crewSetupHeaderObj.project_id',
              '$page.variables.crewSetupHeaderObj.project_number',
            ],
          });
        }
      }
    }
  }

  return SelectValueItemChangeChain;
});
