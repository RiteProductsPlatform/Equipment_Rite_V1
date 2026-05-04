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

  class TableSelectedChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.previousValue
     * @param {object} params.value
     * @param {string} params.updatedFrom
     * @param {any[]} params.keys
     * @param {any} params.selected
     */
    async run(context, { event, previousValue, value, updatedFrom, keys, selected }) {
      const { $page, $flow, $application, $constants, $variables } = context;


      let selectedkeys = keys;
      let isAllselected = selected.row.keys.all;
      let selectiondata = [];
      if (isAllselected) {
        selectiondata=$variables.AgreementAdp.data;
      }
      else{
         if (selectedkeys) {
          const results = await ActionUtils.forEach(selectedkeys, async (item, index) => {
            const results2 = await ActionUtils.forEach($variables.AgreementAdp.data, async (items, indexs) => {
              if (item===items.agreement_id) {
                const length = selectiondata.push(items);
              }
            }, { mode: 'serial' });
          }, { mode: 'serial' });
        }
      }
      debugger;
        $variables.approveData = selectiondata;
    }
  }

  return TableSelectedChangeChain;
});
