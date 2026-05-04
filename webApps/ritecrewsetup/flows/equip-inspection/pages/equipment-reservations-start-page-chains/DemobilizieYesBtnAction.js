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

  class DemobilizieYesBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const validateGroup = await $application.functions.validateGroup('demobilizeVal');

      if (validateGroup === 'valid') {
        const formatDate = await $application.functions.formatDate($variables.demobilizeobj.p_disband_date);

        const results = await ActionUtils.forEach($variables.SelectedRows, async (item, index) => {
  
          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/CreateEqpAcceptancePrj',
            uriParams: {
              'p_equipment_class': $variables.SelectedRows[index].equipment_resource_class,
              'p_eqp_request_number': $variables.SelectedRows[index].eqp_request_number,
              'p_equipment_id': $variables.SelectedRows[index].equipment_id,
              'p_disband_date': formatDate,
              'p_comments': $variables.demobilizeobj.p_comments,
            },
          });

          if (response.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Demobilization Initiated Successfully',
              displayMode: 'transient',
              type: 'confirmation',
            });

            const demobilizeDlgClose = await Actions.callComponentMethod(context, {
              selector: '#demobilizeDlg',
              method: 'close',
            });
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to Initiate Demobilization',
              displayMode: 'transient',
            });
            return;
          }
        }, { mode: 'serial' });
        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });
      }
    }
  }

  return DemobilizieYesBtnAction;
});
