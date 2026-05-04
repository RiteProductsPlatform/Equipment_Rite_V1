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

  class SubmitBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @return {string} 
     */
    async run(context) {
      const { $page, $flow, $application, $variables } = context;

      const callFunctionResult = await this.createMasterPayload(context, { arg1: $page.variables.RateSchDetailName, arg2: 'Rate Schedule', arg3: $application.variables.billRateScheduleLevel, arg4: $page.variables.multiCurrencyEnabled, arg5: $page.variables.location_based_differential, arg6: $page.variables.hoursTypeRateDiff, arg7: $page.variables.activeFlag, arg8: $page.variables.defautFlag, arg9: $page.variables.startDate, arg10: $page.variables.endDate, arg11: $page.variables.contract, arg12: $page.variables.projectNumber, arg13: $page.variables.taskNumber, arg14: $page.variables.selectedEquipmentClass });

      const callRestTimeRiteOrdsServicePostInsertRateMasterResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postInsertRateMaster',
        body: callFunctionResult,
      });

      if ($page.variables.downtimeCostRate > 0 || $page.variables.downtimeBillRate > 0) {

        const callFunctionResult = await this.insertDowntimePayload(context, { arg1: $page.variables.RateSchDetailName, arg2: $page.variables.NonLabourResource, arg3: $page.variables.location, arg4: $page.variables.uom, arg5: $page.variables.roundingThreshold, arg6: 'Downtime', arg7: $page.variables.downtimeCostRate, arg8: $page.variables.downtimeBillRate, arg9: $page.variables.downTimeCurrency, arg10: $page.variables.downtimeStartDate, arg11: $page.variables.downtimeEndDate, arg12: $page.variables.selectedEquipmentClass });

        // insertdowntimedetails
        await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postInsertRateDetails',
          body: callFunctionResult,
        }, { id: 'callInsertRateDetails' });
      }

      if ($page.variables.mobilizationCostRate > 0 || $page.variables.mobilizationBillRate > 0) {
        const callFunction2Result = await this.insertDowntimePayload(context, { arg1: $page.variables.RateSchDetailName, arg2: $page.variables.NonLabourResource, arg3: $page.variables.location, arg4: $page.variables.uom, arg5: $page.variables.roundingThreshold, arg6: 'Mobilization', arg7: $page.variables.mobilizationCostRate, arg8: $page.variables.mobilizationBillRate, arg9: $page.variables.mobilizationCurrency, arg10: $page.variables.mobilizationStartDate, arg11: $page.variables.mobilizationEndDate });

        const callRestTimeRiteOrdsServicePostInsertRateDetailsResult = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postInsertRateDetails',
          body: callFunction2Result,
        }, { id: 'callMobilization' });
      }

      if ($page.variables.trasnportCostRate > 0 || $page.variables.transportBillRate > 0) {
        const callFunction3Result = await this.insertDowntimePayload(context, { arg1: $page.variables.RateSchDetailName, arg2: $page.variables.NonLabourResource, arg3: $page.variables.location, arg4: $page.variables.uom, arg5: $page.variables.roundingThreshold, arg6: 'Transportation', arg7: $page.variables.trasnportCostRate, arg8: $page.variables.transportBillRate, arg9: $page.variables.transportCurrency, arg10: $page.variables.transportStartDate, arg11: $page.variables.transportEndDate, arg12: $page.variables.selectedEquipmentClass });

        const callRestTimeRiteOrdsServicePostInsertRateDetails2Result = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postInsertRateDetails',
          body: callFunction3Result,
        });
      }

      if ($page.variables.usageCostRate > 0 || $page.variables.usageBillRate > 0) {
        const callFunction4Result = await this.insertDowntimePayload(context, { arg1: $page.variables.RateSchDetailName, arg2: $page.variables.NonLabourResource, arg3: $page.variables.location, arg4: $page.variables.uom, arg5: $page.variables.roundingThreshold, arg6: 'Usage', arg7: $page.variables.usageCostRate, arg8: $page.variables.usageBillRate, arg9: $page.variables.usageCurrency, arg10: $page.variables.usageStartDate, arg11: $page.variables.usageEndDate, arg12: $page.variables.selectedEquipmentClass });

        const callRestTimeRiteOrdsServicePostInsertRateDetails3Result = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postInsertRateDetails',
          body: callFunction4Result,
        });
      }

      const callComponentMethodOjDialog16537378171CloseResult = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1653737817-1',
        method: 'close',
      }, { id: 'closeDialog' });

      await Actions.navigateBack(context, {
      });

      await Actions.fireNotificationEvent(context, {
        summary: 'Details Submitted Successfully',
        type: 'confirmation',
      });
    }


    convertDate(dateStr) {
      // Define an array of month abbreviations
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

      // Split the input date string
      const [year, month, day] = dateStr.split("-");

      // Extract the last two digits of the year
      const shortYear = year.slice(-2);

      // Convert the month number to month abbreviation
      const monthAbbr = months[parseInt(month, 10) - 1];

      // Format the date as DD-MMM-YY
      return `${day}-${monthAbbr}-${shortYear}`;
    }
 
    async insertDowntimePayload(context, { arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11,arg12 }) {
      const { $page, $flow, $application } = context;
      let resp = {
        "rate_schedule_name": arg1,
        "non_labor_resource": arg2,
        "location": arg3,
        "uom": arg4,
        "rounding_threshold": arg5,
        "rate_types": arg6,
        "cost_rate": arg7,
        "bill_rate": arg8,
        "currency": arg9,
        "rate_type_start_date": this.convertDate(arg10),
        "rate_type_end_date": this.convertDate(arg11),
        "equipment_resource_class": arg12
      };
      console.log(resp);
      return resp;

    }

    async createMasterPayload(context, { arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14 }) {
      const { $page, $flow, $application } = context;
      let resp = {
        "rate_schedule": arg1,
        "rs_description": arg2,
        "bill_rate_schedule_level": arg3,
        "multi_currency_enabled": arg4,
        "allow_location_based_diff": arg5,
        "allow_hours_type_rate_diff": arg6,
        "active_flag": arg7,
        "default_flag": arg8,
        "start_date": this.convertDate(arg9),
        "end_date": this.convertDate(arg10),
        "contract": arg11,
        "project_number": arg12,
        "task_number": arg13,
        "equipment_resource_class":arg14
      };
      console.log("this", resp)
      return resp;
    }







  }
  return ButtonActionChain1;
});