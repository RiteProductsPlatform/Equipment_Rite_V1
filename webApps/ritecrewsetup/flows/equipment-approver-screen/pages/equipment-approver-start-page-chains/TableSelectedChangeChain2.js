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

  class TableSelectedChangeChain2 extends ActionChain {

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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

     let  isAllSelected = selected.row.keys.all;
     let  revisionData =[];

      if (isAllSelected) {
        revisionData = $variables.revisionAdp.data;
      }
      else{
        if (keys) {
          const results = await ActionUtils.forEach(keys, async (itm, indx) => {

            const results2 = await ActionUtils.forEach($variables.revisionAdp.data, async (item, index) => {

              if (itm===item.uid) {
                revisionData.push(item);
              }
            }, { mode: 'serial' });
          }, { mode: 'serial' });
        }
        
      }

      $variables.revisionSelectedData.data = revisionData;
      
    }
  }

  return TableSelectedChangeChain2;
});
