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

  class editDialogOpenActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      $variables.draftobj.name = $variables.selectionrow.project_number+"-"+$variables.selectionrow.project_name;
      $variables.draftobj.projectname = $variables.selectionrow.project_name;
      $variables.draftobj.taskName = $variables.selectionrow.task_name;
      $variables.draftobj.effectiveEndDate = $variables.selectionrow.effective_end_date;
      $variables.draftobj.effectivestartDate = $variables.selectionrow.effective_start_date;


      const editDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#editDialog',
        method: 'open',
      });
    }
  }

  return editDialogOpenActionChain;
});
