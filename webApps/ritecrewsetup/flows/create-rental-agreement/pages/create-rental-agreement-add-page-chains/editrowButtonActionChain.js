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

  class editrowButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.iscreate = false;
      $variables.selectedRow = current.row;
      $variables.lineObj = $variables.selectedRow;
      const popOpen = await Actions.callComponentMethod(context, {
        selector: '#pop',
        method: 'open',
      });
    }
  }

  return editrowButtonActionChain;
});
