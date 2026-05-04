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

  class nonLabourResourceSelectionChangeActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     */
    async run(context, { event, previousValue, value, updatedFrom }) {
      const { $page, $flow, $application, $constants, $variables, $functions, $co } = context;
      $variables.selectedResourceArray = value;

      // $variables.selectedResCount = value.size;
      // const convertSetToArray = await $functions.convertSetToArray(value);

      // const results = await ActionUtils.forEach(convertSetToArray, async (item, index) => {
      //   const response = await Actions.callRest(context, {
      //     endpoint: 'getContractSummary/getEQUIPMENT_RITENLR_LOV1_0GetNlrValues2',
      //     requestTransformOptions: {
      //       filter: {
      //         op: '$co',
      //         attribute: 'name',
      //         value: item,
      //       },
      //     },
      //   });

      //   if (response.ok) {

      //     const unmatchedRecords = await $functions.getUnmatchedRecords(response.body.items, $variables.selectedResourceArray);

      //     if (unmatchedRecords.length>=1) {
      //        $variables.selectedResourceArray.push(unmatchedRecords[0]);
            
      //     }
      //   }
      // }, { mode: 'serial' });
    }
   
  }

  return nonLabourResourceSelectionChangeActionChain;
});
