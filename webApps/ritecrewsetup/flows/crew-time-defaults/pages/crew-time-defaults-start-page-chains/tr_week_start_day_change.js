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

  class tr_week_start_day_change extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      if ($page.variables.custDetailsObj.week_end_day) {

        await Actions.callChain(context, {
          chain: 'tr_No_of_Days_Count',
        });
      }
    }
  }

  return tr_week_start_day_change;
});
