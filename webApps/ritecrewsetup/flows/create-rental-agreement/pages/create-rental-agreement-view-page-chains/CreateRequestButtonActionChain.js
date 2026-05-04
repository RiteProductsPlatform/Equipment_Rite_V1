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

  class CreateRequestButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.tableSelectedAdp.data) {
        if($variables.tableSelectedAdp.data.length>0){

        

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });
// debugger;
          const toEquipmentMultilevelRequisition = await Actions.navigateToFlow(context, {
            flow: 'equipment-multilevel-requisition',
            target: 'parent',
            page: 'equipment-multilevel-requisition-start_copy',
            params: {
              agrArray: $variables.tableSelectedAdp.data,
              isEquipment: true,
              navigatefrom: "Agreement",

            },
          });

        // const toEquipmentRequisition = await Actions.navigateToFlow(context, {
        //   flow: 'equipment-requisition',
        //   target: 'parent',
        //   page: 'equipment-requisition-start_copy',
        //   params: {
        //     agrArray: $variables.tableSelectedAdp.data,
        //     isEquipment: true,
        //     navigatefrom: "Agreement",
            
        //   },
        // });


        
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Please select records to process with the create request',
            type: 'error',
            displayMode: 'transient',
          });
          
        }
      }
    }
  }

  return CreateRequestButtonActionChain;
});
