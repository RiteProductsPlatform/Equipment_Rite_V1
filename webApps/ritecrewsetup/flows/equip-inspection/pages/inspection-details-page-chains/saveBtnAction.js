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
      const { $variables, $functions , $application } = context;

      let storeApiName ;
      let errMsg ;
      let pagename = 'Equipment Inspection';


      if ($variables.pushObj.type) {


        
        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        try {

        const initialUpdatePayload = {
          "equipment_request_id": $variables.selectedrow.equipment_request_id,
          "inspection_stage": $variables.pushObj.type,
          "eqp_master_status": "EQP MANAGER INSPECTION"
        };

        storeApiName = 'postEQPInspectionApproval';

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
          body: initialUpdatePayload,
          headers: {
            'R_PAGE_NAME': pagename,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },

        });


        if (!response.ok) {
              errMsg =
              response.body?.detail ||
              response.body?.message ||
              (typeof response.body === 'string' ? response.body : null) ||
              response.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        }


        // if (!response.ok) {
        //   await Actions.callComponentMethod(context, {
        //     selector: '#loadingDialog',
        //     method: 'close',
        //   });



        //   await Actions.fireNotificationEvent(context, {
        //     summary: 'Initial status update failed',
        //     displayMode: 'transient',
        //     type: 'error',
        //   });

        //   return;
        // }


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

          storeApiName = 'postEQPInspectionApproval';
          
          const res = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
            body: data,
             headers: {
              'R_PAGE_NAME': pagename,
              'R_TRACE_ID': $application.variables.traceIdDisplay || null,
              'R_USER_NAME': $application.user.username,
            },
          });

          
if (!res.ok) {
            errMsg =
              res.body?.detail ||
              res.body?.message ||
              (typeof res.body === 'string' ? res.body : null) ||
              res.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        }


          // if (!res.ok) {
          //   isSuccess = false;
          //   break; 
          // }


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

          let obj =
          {
            "Message": "FYI- Request No."+ $variables.selectedrow.eqp_request_number+"  has been shipped by "  + $application.variables.user,
            "TaskCreator":$application.variables.user,
            "Role_Name": "OII Equipment Requestor"
          };

          storeApiName = 'postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report';

          const response2 = await Actions.callRest(context, {
            endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',
             headers: {
                'R_PAGE_NAME': pagename,
                'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                'R_USER_NAME': $application.user.username,
              },
            body: obj,
          });

          if (!response2.ok) {
            errMsg =
              response2.body?.detail ||
              response2.body?.message ||
              (typeof response2.body === 'string' ? response2.body : null) ||
              response2.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        }

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
        } catch (error) {
         const errorMessage = error?.message ||
    error?.body?.detail ||
    error?.body?.message||
      "Unknown API Error";


          const response3 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
            headers: {
            'R_PAGE_NAME': pagename,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
            'p_api_name': storeApiName,
            'p_debug_message':errorMessage,
          },
          });
          await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });

           } finally {

          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
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
