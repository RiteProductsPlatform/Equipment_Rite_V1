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
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.headerobj.project_id = data.project_id;
      $variables.headerobj.task_name= data.task_name;
      $variables.headerobj.task_number=data.task_number;
      $variables.headerobj.task_id=data.task_id;
      $variables.headerobj.project_number=data.project_number;

     
    }
  }

  return SelectValueItemChangeChain;
});
