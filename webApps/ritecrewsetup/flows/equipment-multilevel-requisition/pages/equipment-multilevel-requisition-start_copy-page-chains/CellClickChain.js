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

  class CellClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.current 
     */
    async run(context, { current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      $variables.selectedRow = current;

      const requestdetailsOpen = await Actions.callComponentMethod(context, {
        selector: '#requestdetails',
        method: 'open',
      });
    }
  }

  return CellClickChain;
});
