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

  class eqpchecklistSaveActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.eqpchecklistSaveADP.data',
  ],
      });

      const eqpchecklistClose = await Actions.callComponentMethod(context, {
        selector: '#eqpchecklist',
        method: 'close',
      });
    }
  }

  return eqpchecklistSaveActionChain;
});
