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

  class add_Checklist extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.callChain(context, {
        chain: 'adddchecklist',
      });

      const equipCheckPopupClose = await Actions.callComponentMethod(context, {
        selector: '#equipCheck_popup',
        method: 'close',
      });
    }
  }

  return add_Checklist;
});
