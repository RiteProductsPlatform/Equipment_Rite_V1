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

  class UpdateButtonActionChain6 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const updatePayload = await $functions.updatePayload(current.row, $application.variables.user || $application.user.username);

      if (updatePayload) {
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

			  const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/putEQPRite_TemplateLinesDetails',
              body: updatePayload
            });

        if (response.ok) {
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Template updated successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });
          
        }else{
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            type: 'error',
            displayMode: 'transient',
            summary: 'Failed To Update Template',
          });
          
        }
      }
    }
  }

  return UpdateButtonActionChain6;
});
