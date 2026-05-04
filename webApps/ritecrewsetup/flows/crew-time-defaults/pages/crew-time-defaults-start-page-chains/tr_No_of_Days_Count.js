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

  class tr_No_of_Days_Count extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.weekDaysCount($page.variables.custDetailsObj.week_start_day, $page.variables.custDetailsObj.week_end_day);

      $page.variables.custDetailsObj.no_of_days = parseInt(callFunctionResult);
    }
  }

  return tr_No_of_Days_Count;
});
