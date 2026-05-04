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

  class saveBtnAction extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $variables, $functions } = context;


      if ($variables.pushObj.type) {


       await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const initialUpdatePayload = {
          "equipment_request_id": $variables.selectedrow.equipment_request_id,
          "inspection_stage": $variables.pushObj.type,
          "eqp_master_status": "EQP MANAGER INSPECTION"
        };



        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
          body: initialUpdatePayload,
        });


        if (!response.ok) {
          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });



          await Actions.fireNotificationEvent(context, {
            summary: 'Initial status update failed',
            displayMode: 'transient',
            type: 'error',
          });

          return;
        }


        const filteredData = await $functions.filtercheckedData($variables.inspection_adp.data);

        let isSuccess = true;

        let fileToBase64 = function (file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]); // Base64 only
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        }
        for (let i = 0; i < filteredData.length; i++) {
          const item = filteredData[i];

          const data = {
            "p_check_list_name": item.check_list_name,
            "hdrid": "",
            "p_equipment_request_id": $variables.selectedrow.equipment_request_id,
            "p_inspection_section": item.section,
            "p_inspection_value": item.inspection_value,
            "p_notes": item.notes,
            "p_pass_fail": item.status,
            "p_file_name": item.file_name,
            "p_file_type": item.file_type,
            "p_file_content": item.file_content,
            "p_save_draft_flag": "Y",
            "p_role": "Equipment Manager Inspection"
          };

          const res = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
            body: data,
          });

          if (!res.ok) {
            isSuccess = false;
            break; // 
          }

  
        }


        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });


        if (isSuccess) {

          await Actions.fireNotificationEvent(context, {
            summary: 'Inspection Saved Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

          await Actions.callChain(context, {
            chain: 'primarybackBtnAction',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Save Inspection',
            displayMode: 'transient',
            type: 'error',
          });
        }
      } else {

        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Inspection Type',
          displayMode: 'transient',
        });

      }
    }
  }

  return saveBtnAction;
});
