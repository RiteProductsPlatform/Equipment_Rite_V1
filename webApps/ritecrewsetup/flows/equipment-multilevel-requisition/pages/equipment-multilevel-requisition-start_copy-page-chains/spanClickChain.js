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

  class spanClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.current
     */
    async run(context, { event, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;
    }
  }

  return spanClickChain;
});
