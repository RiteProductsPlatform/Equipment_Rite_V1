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

  class timeEntryTableSelectedActionChain extends ActionChain {

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

      let timeEntry = [];
  //  debugger;
      if (selected.row.keys.all) {
        timeEntry = $variables.projectBasedTimesheetADP.data;

      } else {
        if (keys) {
          const results = await ActionUtils.forEach(keys, async (itm, indx) => {

            const results2 = await ActionUtils.forEach($variables.projectBasedTimesheetADP.data, async (item, index) => {

              if (itm===item.uid) {
                timeEntry.push(item);
                
              }
            }, { mode: 'serial' });
          }, { mode: 'serial' });
        }

      }
      $variables.FilteredData = timeEntry;
      // debugger;
    }
  }

  return timeEntryTableSelectedActionChain;
});
