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

  class deleteButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.FTOdlgADP,
        remove: {
          indexes: [$variables.selectedRow.index],
        },
      });

      const actionpopupClose = await Actions.callComponentMethod(context, {
        selector: '#Actionpopup',
        method: 'close',
      });
    }
  }

  return deleteButtonActionChain;
});
