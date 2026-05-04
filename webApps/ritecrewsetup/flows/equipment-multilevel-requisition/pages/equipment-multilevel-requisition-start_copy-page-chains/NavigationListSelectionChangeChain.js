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

  class NavigationListSelectionChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.selection
     * @param {object} params.current
     */
    async run(context, { event, previousValue, value, updatedFrom, selection, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      // debugger;
    }
  }

  return NavigationListSelectionChangeChain;
});
