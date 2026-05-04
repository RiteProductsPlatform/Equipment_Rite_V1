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

  class ButtonActionChain3 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQP_IOT_Registration_Details',
        uriParams: {
          'p_iot_device_name': $variables.IOT_headerobj.iot_devicename,
        },
      });

      $variables.getDataIOT.data = response.body.items;
    }
  }

  return ButtonActionChain3;
});
