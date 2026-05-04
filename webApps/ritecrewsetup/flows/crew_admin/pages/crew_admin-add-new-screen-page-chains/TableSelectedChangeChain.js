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
    let selctionData = [];

      $variables.eqpSubstitutekeys = keys;
      if (selected.row.keys.all) {
        selctionData = $variables.eqpSubstituteAdp.data;
      }else{
        if(keys){
          const results = await ActionUtils.forEach(keys, async (item, index) => {

            const results2 = await ActionUtils.forEach($variables.eqpSubstituteAdp.data, async (itm, indx) => {

              if (item===itm.uid) {
                const length = selctionData.push(itm);
                
              }
            }, { mode: 'serial' });
          }, { mode: 'serial' });

        }

      }

      $variables.eqpSubstituteSelectedAdp.data = selctionData;
    }
  }

  return TableSelectedChangeChain;
});
