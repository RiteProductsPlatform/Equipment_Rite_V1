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

  class TR_HeaderCustomerValueChangeAction extends ActionChain {

    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;

      if (data.customer_name && !$page.variables.IsSearch) {
        $page.variables.crewSetupHeaderObj.customer_id = data.customer_id;
        $page.variables.crewSetupHeaderObj.crew_start_week = data.week_start_day;
        $page.variables.crewSetupHeaderObj.crew_end_week = data.week_end_day;
        $page.variables.crewSetupHeaderObj.start_date = data.effective_start_date;
        $page.variables.crewSetupHeaderObj.end_date = data.effective_end_date;
        $page.variables.crewSetupHeaderObj.mon_in_time = data.mon_in_time;
        $page.variables.crewSetupHeaderObj.tue_in_time = data.tue_in_time;
        $page.variables.crewSetupHeaderObj.wed_in_time = data.wed_in_time;
        $page.variables.crewSetupHeaderObj.thu_in_time = data.thu_in_time;
        $page.variables.crewSetupHeaderObj.fri_in_time = data.fri_in_time;
        $page.variables.crewSetupHeaderObj.sat_in_time = data.sat_in_time;
        $page.variables.crewSetupHeaderObj.sun_in_time = data.sun_in_time;
        $page.variables.crewSetupHeaderObj.mon_out_time = data.mon_out_time;
        $page.variables.crewSetupHeaderObj.tue_out_time = data.tue_out_time;
        $page.variables.crewSetupHeaderObj.wed_out_time = data.wed_out_time;
        $page.variables.crewSetupHeaderObj.thu_out_time = data.thu_out_time;
        $page.variables.crewSetupHeaderObj.fri_out_time = data.fri_out_time;
        $page.variables.crewSetupHeaderObj.sat_out_time = data.sat_out_time;
        $page.variables.crewSetupHeaderObj.sun_out_time = data.sun_out_time;
      }
    }
  }

  return TR_HeaderCustomerValueChangeAction;
});
