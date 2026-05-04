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

  class custDetailsCloseBtn extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodCustdetailsCloseResult = await Actions.callComponentMethod(context, {
        selector: '#custdetails',
        method: 'close',
      });
    }
  }

  return custDetailsCloseBtn;
});
