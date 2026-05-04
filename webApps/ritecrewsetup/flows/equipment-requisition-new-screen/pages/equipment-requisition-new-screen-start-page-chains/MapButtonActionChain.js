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

  class MapButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentnewADP,
        update: {
          data: $variables.equpvariables,
          indexes: $variables.currindx,
        },
      });

      const locationDialogClose = await Actions.callComponentMethod(context, {
        selector: '#locationDialog',
        method: 'close',
      });
    }
  }

  return MapButtonActionChain;
});
