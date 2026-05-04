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

  class TR_DefaultContracts extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      $page.variables.defaultCheck = true;
      $page.variables.dialogLabel = 'Default ';

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.updateContracts',
        ],
      });

      const callComponentMethodEditContractDetailsOpenResult = await Actions.callComponentMethod(context, {
        selector: '#editContractDetails',
        method: 'open',
      });

      $page.variables.updateContracts = current;
      $page.variables.defaultContracts.customer_name = $page.variables.custDetailsObj.customer_name;
      $page.variables.defaultContracts.customer_number = $page.variables.custDetailsObj.customer_number;
      $page.variables.defaultContracts.contract_number = $page.variables.updateContracts.contract_number;
      $page.variables.defaultContracts.contract_id = $page.variables.updateContracts.contract_id;
      $page.variables.defaultContracts.week_start_day = $page.variables.custDetailsObj.week_start_day;
      $page.variables.defaultContracts.week_end_day = $page.variables.custDetailsObj.week_end_day;
      $page.variables.defaultContracts.no_of_days = $page.variables.custDetailsObj.no_of_days;
      $page.variables.defaultContracts.ot_allowed = $page.variables.custDetailsObj.ot_allowed === true ? true : false;
      $page.variables.defaultContracts.ot_threshold_measure = $page.variables.custDetailsObj.ot_threshold_measure;
      $page.variables.defaultContracts.ot_threshold_limit = $page.variables.custDetailsObj.ot_threshold_limit;
      $page.variables.defaultContracts.active_flag = $page.variables.custDetailsObj.active_flag === true ? true : false;
      $page.variables.defaultContracts.billing_frequency = $page.variables.custDetailsObj.billing_frequency;
      $page.variables.defaultContracts.effective_start_date = $page.variables.custDetailsObj.effective_start_date;
      $page.variables.defaultContracts.effective_end_date = $page.variables.custDetailsObj.effective_end_date;
      $page.variables.defaultContracts.per_diem = $page.variables.custDetailsObj.per_diem;
      $page.variables.defaultContracts.bonus = $page.variables.custDetailsObj.bonus;
      $page.variables.defaultContracts.safety_bonus = $page.variables.custDetailsObj.safety_bonus;
      $page.variables.defaultContracts.time_entry_method = $page.variables.updateContracts.time_entry_method;
      $page.variables.defaultContracts.ot_shift_name = $page.variables.updateContracts.ot_shift_name;
    }
  }

  return TR_DefaultContracts;
});
