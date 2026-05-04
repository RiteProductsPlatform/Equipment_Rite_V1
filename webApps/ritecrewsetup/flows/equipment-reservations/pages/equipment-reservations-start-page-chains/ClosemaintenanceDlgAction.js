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

  class ClosemaintenanceDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const maintenanceDlgClose = await Actions.callComponentMethod(context, {
        selector: '#maintenanceDlg',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
    'EqpMasterWorkOrderADP.data',
  ],
      });
    }
  }

  return ClosemaintenanceDlgAction;
});
