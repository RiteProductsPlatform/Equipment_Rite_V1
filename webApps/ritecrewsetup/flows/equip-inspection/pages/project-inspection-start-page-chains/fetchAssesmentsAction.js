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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      if ($variables.label === 'Edit') {

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getEQPAdmin_ChecklistSearch',
          uriParams: {
            'p_equipment_name': $variables.selectedrow.equipment_name ? $variables.selectedrow.equipment_name : "",
            'p_equipment_class': $variables.selectedrow.equipment_resource_class ? $variables.selectedrow.equipment_resource_class : "",
          },
        });
        if (!response.ok) {
          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
          return;
        } else {
          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
          $variables.inspection_adp.data = response.body.items;
        }


      } else if ($variables.label === 'View') {
        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getEQPRite_InspectionView',
          uriParams: {
            'p_equipment_request_id': $page.variables.selectedrow.equipment_request_id,
            'p_eqp_request_number': $page.variables.selectedrow.eqp_request_number,
          },
        });

        if (!response2.ok) {
          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
          return;
        } else {

          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
          $variables.inspection_adp.data = response2.body.items;
          $variables.pushObj.type = response2.body.items[0].inspection_stage;
        }

      }





    }
  }

  return SearchBtnAction;
});
