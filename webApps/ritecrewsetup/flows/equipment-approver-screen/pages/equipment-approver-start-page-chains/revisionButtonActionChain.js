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

  class revisionButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {string} params.current
     */
    async run(context, { event, originalEvent, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_TimeEntryRevisionSearch',
        uriParams: {
          'p_batch_id': current.batch_id,
        },
      });

    $variables.revisionAdp.data =  await $functions.addUniqId(response.body.items);

    // debugger;

      const revisionDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#revisionDialog',
        method: 'open',
      });
    }
  }

  return revisionButtonActionChain;
});
