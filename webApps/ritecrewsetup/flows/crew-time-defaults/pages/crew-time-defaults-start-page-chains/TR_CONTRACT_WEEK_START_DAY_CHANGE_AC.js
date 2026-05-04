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

  class TR_CONTRACT_WEEK_START_DAY_CHANGE_AC extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      if ($page.variables.updateContracts.week_end_day) {
        await Actions.callChain(context, {
          chain: 'TR_CONTRACT_NO_OF_DAYS_CHANGE_AC',
        });
      }
    }
  }

  return TR_CONTRACT_WEEK_START_DAY_CHANGE_AC;
});
