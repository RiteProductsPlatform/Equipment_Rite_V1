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

  class ProjectValueChange extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      
      if($variables.SearchObj.StartDate && $variables.SearchObj.EndDate){
      $variables.selectedRow.start_date = $variables.SearchObj.StartDate;
      $variables.selectedRow.end_date = $variables.SearchObj.EndDate;
      }
    }
  }

  return ProjectValueChange;
});
