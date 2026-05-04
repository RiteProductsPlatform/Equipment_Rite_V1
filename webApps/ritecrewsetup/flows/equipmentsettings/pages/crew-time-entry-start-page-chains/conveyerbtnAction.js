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

  class conveyerbtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.label 
     */
    async run(context, { label }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.selectedConveyer = label;
    }
  }

  return conveyerbtnAction;
});
