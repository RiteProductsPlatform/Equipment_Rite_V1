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

  class InputTextValueChangeChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // $variables.MasterTabObj.equipment_Num = $variables.AssetsTabObj.inventory_Item
      //   + (value ? "-" + value : '');
    }
  }

  return InputTextValueChangeChain2;
});
