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

  class EditiconClickAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.isEdit = $variables.isEdit === true ? false: true;
      $variables.pagetype = $variables.isEdit === true ? "Save" : $variables.currentPage;
    }
  }

  return EditiconClickAction;
});
