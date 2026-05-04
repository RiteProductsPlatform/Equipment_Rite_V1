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

  class CloseEditProjectsDialog extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodEditProjectDetailsCloseResult = await Actions.callComponentMethod(context, {
        selector: '#editProjectDetails',
        method: 'close',
      });
    }
  }

  return CloseEditProjectsDialog;
});
