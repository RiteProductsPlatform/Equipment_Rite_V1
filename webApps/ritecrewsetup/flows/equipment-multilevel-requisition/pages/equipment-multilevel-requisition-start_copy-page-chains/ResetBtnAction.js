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

  class ResetBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      $variables.equipmentArray = [];

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.equipmentADP.data',
  ],
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentADP,
        refresh: null,
      });

      await Actions.callChain(context, {
        chain: 'fetchEquipments',
      });
    }
  }

  return ResetBtnAction;
});
