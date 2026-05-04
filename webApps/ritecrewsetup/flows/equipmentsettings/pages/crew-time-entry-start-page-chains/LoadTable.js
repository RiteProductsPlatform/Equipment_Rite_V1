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

  class LoadTable extends ActionChain {
    async run(context) {
      const { $variables } = context;
      $variables.showTable = true;
      $variables.showFields = false; // Hide fields if previously shown
    }
  }

  return LoadTable;
});

