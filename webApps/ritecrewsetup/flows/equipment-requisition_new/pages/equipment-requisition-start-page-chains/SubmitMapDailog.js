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

  class SubmitMapDailog extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentnewADP,
        update: {
          data: $variables.equpvariable,
          indexes: $variables.currindx,
        },
      });

      const locationDialogClose = await Actions.callComponentMethod(context, {
        selector: '#locationDialog',
        method: 'close',
      });
    }
  }

  return SubmitMapDailog;
});
