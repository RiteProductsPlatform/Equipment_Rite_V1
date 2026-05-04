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

  class TR_DateValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if (value) {
        const callFunctionResult = await $page.functions.getDay(value);

        $page.variables.WeekObj = callFunctionResult.dateobj;
      }
    }
  }

  return TR_DateValueChangeChain;
});
