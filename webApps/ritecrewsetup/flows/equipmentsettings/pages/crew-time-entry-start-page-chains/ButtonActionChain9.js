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

  class ButtonActionChain9 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const submittableItems = await $page.variables.eqpSettingsBdp.instance.getSubmittableItems();

  

      const results = await ActionUtils.forEach(submittableItems, async (item, index) => {

        
        const updatesettings = await $functions.updatesettings(item.item.data);

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEqpSettings',
          uriParams: {
            'p_id': updatesettings.p_id,
          },
          body: updatesettings,
        });

        if (response.ok) {
          $variables.response = true;
          
        }else{
          $variables.response = false;

        }
      }, { mode: 'serial' });

      if ( $variables.response) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Settings Updated',
          type: 'confirmation',
          displayMode: 'transient',
        });

      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Update Settings',
          type: 'error',
          displayMode: 'transient',
        });
        
      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return ButtonActionChain9;
});
