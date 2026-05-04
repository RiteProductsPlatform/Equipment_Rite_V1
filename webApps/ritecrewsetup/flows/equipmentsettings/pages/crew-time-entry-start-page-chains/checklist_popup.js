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

  class checklist_popup extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.deleteChecklist_obj.data = current.row;
      $variables.deleteChecklist_obj.index = index;
      $variables.deleteChecklist_obj.key = key;

      const equipCheckPopupOpen = await Actions.callComponentMethod(context, {
        selector: '#equipCheck_popup',
        method: 'open',
      });
    }
  }

  return checklist_popup;
});
