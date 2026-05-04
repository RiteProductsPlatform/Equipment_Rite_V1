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

  class AddFields extends ActionChain {
    async run(context) {
      const { $variables } = context;
      $variables.showFields = true;
      $variables.showTable = false; // Hide table if previously shown
    }
  }

  return AddFields;
});
