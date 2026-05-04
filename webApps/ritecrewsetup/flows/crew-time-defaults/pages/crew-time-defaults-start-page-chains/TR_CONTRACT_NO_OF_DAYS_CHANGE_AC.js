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

  class TR_CONTRACT_NO_OF_DAYS_CHANGE_AC extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $page.functions.weekDaysCount($page.variables.updateContracts.week_start_day, $page.variables.updateContracts.week_end_day);

      $page.variables.updateContracts.no_of_days = parseInt(callFunctionResult);
    }
  }

  return TR_CONTRACT_NO_OF_DAYS_CHANGE_AC;
});
