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

  class rateDetailsDialogCloseButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const ratedetailsClose = await Actions.callComponentMethod(context, {
        selector: '#ratedetails',
        method: 'close',
      });
    }
  }

  return rateDetailsDialogCloseButtonActionChain2;
});
