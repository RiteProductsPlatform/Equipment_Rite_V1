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

  class revisionDialogButtonCloseActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const revisionDialogClose = await Actions.callComponentMethod(context, {
        selector: '#revisionDialog',
        method: 'close',
      });
    }
  }

  return revisionDialogButtonCloseActionChain;
});
