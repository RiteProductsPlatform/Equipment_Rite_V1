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

  class CheckboxSetValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.value 
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { value, key, index, current }) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await this.checkAll(context);
    }

    /**
     * @param {Object} context
     */
    async checkAll(context) {
      const { $page, $flow, $application } = context;
          items.forEach(item => {
      //console.log(item.approval_status, "Mainak0701");
      if (!(item.approval_status === "In Process" || item.eft_status === "Submitted to Generate EFT")) {
        item.selected = true;
      }
    });
    //console.log(items, "selectallMainak");
    return items;
    }
  }

  return CheckboxSetValueChangeChain;
});
