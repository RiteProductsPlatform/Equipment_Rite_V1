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

  class eqpchecklistDialogOpen extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.callChain(context, {
        chain: 'adddchecklist',
      });

      const eqpchecklistOpen = await Actions.callComponentMethod(context, {
        selector: '#eqpchecklist',
        method: 'open',
      });
    }
  }

  return eqpchecklistDialogOpen;
});
