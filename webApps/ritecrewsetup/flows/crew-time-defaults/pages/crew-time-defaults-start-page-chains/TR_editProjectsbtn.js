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

  class TR_editProjectsbtn extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      $page.variables.defaultCheck = false;

      const callComponentMethodEditProjectDetailsOpenResult = await Actions.callComponentMethod(context, {
        selector: '#editProjectDetails',
        method: 'open',
      });

      $page.variables.updateProjects = current;
      $page.variables.dialogLabel = 'Edit';
    }
  }

  return TR_editProjectsbtn;
});
