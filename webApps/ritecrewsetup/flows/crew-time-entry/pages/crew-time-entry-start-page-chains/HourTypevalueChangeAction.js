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

  class HourTypevalueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
     
      // let costRate=$functions.getCostRateByHoursType($variables.crewHoursTypeCost, $variables.projectBasedRowData.hours_type);
      // $variables.projectBasedRowData.cost_rate= costRate;
         $variables.projectBasedRowData.cost_rate= data.bill_rate;
    }
  }

  return HourTypevalueChangeAction;
});
