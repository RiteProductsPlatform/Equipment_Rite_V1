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

  class ButtonActionChain_DELETE_IOT extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.getDataIOT,
        remove: {
          data: $variables.iotDelete_obj.data,
          indexes: $variables.iotDelete_obj.index,
          keys: $variables.iotDelete_obj.key,
        },
      });

      const iotpopupClose = await Actions.callComponentMethod(context, {
        selector: '#iotpopup',
        method: 'close',
      });
    }
  }

  return ButtonActionChain_DELETE_IOT;
});
