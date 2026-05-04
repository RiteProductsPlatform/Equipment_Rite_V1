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

  class SelectValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     */
    async run(context, { event, previousValue, value, updatedFrom }) {
      const { $page, $flow, $application, $constants, $variables, $eq, $functions, $co } = context;


      const convertSetToArray = await $functions.convertSetToArray(value);

      const results = await ActionUtils.forEach(convertSetToArray, async (item, index) => {

        const response = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITENLR_LOV1_0GetNlrValues2',
          requestTransformOptions: {
            filter: {
              op: '$co',
              attribute: 'name',
              value: item,
            },
          },
          uriParams: {
            'P_ORG_NAME': $variables.selectedorgValueObj.orgName,
            name: item,
          },
        });

        // const response = await Actions.callRest(context, {
        //   endpoint: 'getContractSummary/getEQUIPMENT_RITENLR_LOV1_0GetNlrValues2',
        //   requestTransformOptions: {
        //     filter: {
        //       op: '$co',
        //       attribute: 'name',
        //       value: item,
        //     },
        //   },
        //   uriParams: {
        //     'P_ORG_NAME': $variables.assetobj.item_organization ||   $variables.MasterTabObj.inv_organization_name,
        //   },
        // });
// debugger;
        const unmatchedRecords = await $functions.getUnmatchedRecords(response.body.items, $variables.selectednonlabourResource);

        const results2 = await ActionUtils.forEach(unmatchedRecords, async (items, indexs) => {

          if (items.name===item) {
            const length = $variables.selectednonlabourResource.push(items);
            
          }
        }, { mode: 'serial' });
        debugger

        // if (unmatchedRecords.length>=1) {

        //   $variables.selectednonlabourResource.push(unmatchedRecords[0]);
        // }
      }, { mode: 'serial' });
      // debugger;
    }
  }

  return SelectValueChangeChain;
});
