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

  class ButtonActionChain_addIOT extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      
       $variables.postData_IOT_copy.iot_id = $page.variables.getDataIOT.data.length === 0 ? 1
        : Math.max(...$page.variables.getDataIOT.data.map(obj => obj.iot_id)) + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.getDataIOT,
        add: {
          data: $variables.postData_IOT_copy,
          keys: $variables.postData_IOT_copy.iot_id,
        },
      });
    }
  }

  return ButtonActionChain_addIOT;
});
