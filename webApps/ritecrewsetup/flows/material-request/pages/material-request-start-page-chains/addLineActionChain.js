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

  class addLineActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.FTOdlgADP,
        add: {
          data: $variables.ftoblankrowData,
        },
      });

      const actionpopupClose = await Actions.callComponentMethod(context, {
        selector: '#Actionpopup',
        method: 'close',
      });
    }
  }

  return addLineActionChain;
});
