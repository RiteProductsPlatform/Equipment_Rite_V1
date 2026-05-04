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

  class rejectButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const status = await $functions.checkStatus($variables.FilteredData);

      if (status) {
        await Actions.callChain(context, {
          chain: 'rejectButtonAction_JS',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$variables.approverMainTableADP.data',
  ],
        });

        await Actions.callChain(context, {
          chain: 'SearchButtonActionChain_New',
        });
        
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Records With Submitted Status',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return rejectButtonActionChain;
});
