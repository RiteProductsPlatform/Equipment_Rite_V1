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

  class CloseOverrideDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.eqpOverride',
    '$page.variables.contract',
    '$page.variables.contractid',
    '$page.variables.billplan',
    '$page.variables.billplanId',
    '$page.variables.billRateVar',
  ],
      });

      const equipmentOverrideDlgClose = await Actions.callComponentMethod(context, {
        selector: '#EquipmentOverrideDlg',
        method: 'close',
      });
    }
  }

  return CloseOverrideDlgAction;
});
