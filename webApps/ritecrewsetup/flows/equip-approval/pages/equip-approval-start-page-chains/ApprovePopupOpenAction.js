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

  class ApprovePopupOpenAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
// debugger;
      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.DetailsTblADP.data',
    '$page.variables.projDetailsADP.data',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_EqpDetailSearch',
        uriParams: {
          'p_equipment_name': $variables.selectionrow.equipment_name,
          'p_equipment_resource_class':$variables.selectionrow.equipment_resource_class,
          'p_end_date': $functions.dateformatter($variables.selectionrow.effective_end_date),
          'p_start_date': $functions.dateformatter($variables.selectionrow.effective_end_date),
        },
      });

      if (response.ok) {
        

        if (response.body.items.length>0) {
          

          $variables.dlglabel = 'Equipment Manager Approval';
          $variables.DetailsTblADP.data = response.body.items;

          const approverejectDlgOpen = await Actions.callComponentMethod(context, {
            selector: '#approverejectDlg',
            method: 'open',
          });

          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getEQPRite_SubstituteDetails',
            uriParams: {
              'p_parent_equipment_id': response.body.items[0].equipment_id,
            },
          });

          if (response2.ok) {
 $variables.DetailsTblADPNew.data = response2.body.items;
          }
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'No Data Found',
            type: 'info',
            displayMode: 'transient',
          });
          
        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Fetch Data',
          type: 'error',
          displayMode: 'transient',
        });
      }

     
    }
  }

  return ApprovePopupOpenAction;
});
