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

  class effDateValueChange extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if ($page.variables.linesObj.effective_start_date_copy && $page.variables.linesObj.effective_end_date_copy) {

        const callFunctionResult = await $application.functions.getUniqueDayNamesBetweenDates($page.variables.linesObj.effective_start_date_copy, $page.variables.linesObj.effective_end_date_copy);

        $page.variables.linesweekObj = callFunctionResult;
        $page.variables.linesObj.mon_in_time = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.mon_in_time : "00:00";
        $page.variables.linesObj.mon_out_time = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.mon_out_time : "00:00";
        $page.variables.linesObj.mon_quantity = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.mon_quantity : "0";
        $page.variables.linesObj.tue_in_time = callFunctionResult.Tuesday ? $page.variables.crewSetupHeaderObj.tue_in_time : "00:00";
        $page.variables.linesObj.tue_out_time = callFunctionResult.Tuesday ? $page.variables.crewSetupHeaderObj.tue_out_time : "00:00";
        $page.variables.linesObj.tue_quantity = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.tue_quantity : "0";
        $page.variables.linesObj.wed_in_time = callFunctionResult.Wednesday ? $page.variables.crewSetupHeaderObj.wed_in_time : "00:00";
        $page.variables.linesObj.wed_out_time = callFunctionResult.Wednesday ? $page.variables.crewSetupHeaderObj.wed_out_time : "00:00";
        $page.variables.linesObj.wed_quantity = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.wed_quantity : "0";
        $page.variables.linesObj.thu_in_time = callFunctionResult.Thursday ? $page.variables.crewSetupHeaderObj.thu_in_time : "00:00";
        $page.variables.linesObj.thu_out_time = callFunctionResult.Thursday ? $page.variables.crewSetupHeaderObj.thu_out_time : "00:00";
        $page.variables.linesObj.thu_quantity = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.thu_quantity : "0";
        $page.variables.linesObj.fri_in_time = callFunctionResult.Friday ? $page.variables.crewSetupHeaderObj.fri_in_time : "00:00";
        $page.variables.linesObj.fri_out_time = callFunctionResult.Friday ? $page.variables.crewSetupHeaderObj.fri_out_time : "00:00";
        $page.variables.linesObj.fri_quantity = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.fri_quantity : "0";
        $page.variables.linesObj.sat_in_time = callFunctionResult.Saturday ? $page.variables.crewSetupHeaderObj.sat_in_time : "00:00";
        $page.variables.linesObj.sat_out_time = callFunctionResult.Saturday ? $page.variables.crewSetupHeaderObj.sat_out_time : "00:00";
        $page.variables.linesObj.sat_quantity = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.sat_quantity : "0";
        $page.variables.linesObj.sun_in_time = callFunctionResult.Sunday ? $page.variables.crewSetupHeaderObj.sun_in_time : "00:00";
        $page.variables.linesObj.sun_out_time = callFunctionResult.Sunday ? $page.variables.crewSetupHeaderObj.sun_out_time : "00:00";
        $page.variables.linesObj.sun_quantity = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.sun_quantity : "0";
      }
    }
  }

  return effDateValueChange;
});
