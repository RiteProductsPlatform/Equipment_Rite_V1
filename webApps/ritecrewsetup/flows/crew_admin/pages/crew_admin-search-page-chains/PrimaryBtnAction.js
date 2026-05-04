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

  class PrimaryBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions, $co, $eq } = context;

      if ($variables.pagetype === "Create") {
        const toCrewAdmin = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'crew_admin',
          page: 'crew_admin-add-new-screen',
        });

      } else if ($variables.pagetype === "Save") {
        let responseVar;

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });
        const updatepayload = await $functions.updatepayload($variables.RowData, $application.variables.user);

        updatepayload.p_non_labor_resource = null;
        updatepayload.p_non_labor_resource_org = null;
        
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putGetEquipmentMasterDetail',
          body: updatepayload,
          uriParams: {
            'p_parent_equipment_id': $variables.RowData.equipment_id,
          },
        });
        // debugger;
        if ($variables.selectedResourceArray) {

          const convertSetToArray = await $functions.convertSetToArray($variables.selectedResourceArray);

          const results = await ActionUtils.forEach(convertSetToArray, async (item, index) => {

            // const response3 = await Actions.callRest(context, {
            //   endpoint: 'getContractSummary/getEQUIPMENT_RITENLR_LOV1_0GetNlrValues2',
            //   requestTransformOptions: {
            //     filter: {
            //       op: '$eq',
            //       attribute: 'name',
            //       value: item,
            //     },
            //   },
            //   uriParams: {
            //     'P_ORG_NAME': $variables.RowData.organization_name,
            //   },
            // });

            const response3 = await Actions.callRest(context, {
              endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITENLR_LOV1_0GetNlrValues2',
              requestTransformOptions: {
                filter: {
                  op: '$eq',
                  attribute: 'name',
                  value: item,
                },
              },
              uriParams: {
                'P_ORG_NAME': $variables.RowData.organization_name,
              },
            });

            if (response3.ok) {
              
              const results2 = await ActionUtils.forEach(response3.body.items, async (itms, indexs) => {
// debugger;
                if (itms.name===item) {

                  updatepayload.p_non_labor_resource =itms.name;
                  updatepayload.p_non_labor_resource_org = itms.organization;
                  updatepayload.p_expenditure_type_name = itms.expendituretypename;
                  updatepayload.p_expenditure_type_id = itms.expendituretypeid;
                  updatepayload.p_update_type = "EQP_NONLABOR";

                  const response2 = await Actions.callRest(context, {
                    endpoint: 'TimeRite_Ords_Service/putGetEquipmentMasterDetail',
                    uriParams: {
                      'p_parent_equipment_id': $variables.RowData.equipment_id,
                    },
                    body: updatepayload,
                  });
                }
              }, { mode: 'serial' });

              // responseVar = response2;
            }
          }, { mode: 'serial' });
        }

        if ($variables.editSubstituteADP.data) {
          if($variables.editSubstituteADP.data.length>0){
            // debugger;
            const results3 = await ActionUtils.forEach($variables.editSubstituteADP.data, async (item, index) => {
              updatepayload.p_priority = item.priority;
              updatepayload.p_unit_of_measure = item.uom;
              updatepayload.p_quantity = item.quantity;
              updatepayload.p_equipment_name = item.lkpvalue;
              updatepayload.p_equipment_number = item.equipment_number;
              updatepayload.p_equipment_id = item.lkpid;
              updatepayload.p_update_type = "EQP_SUBSTITUTE";

              const response4 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/putGetEquipmentMasterDetail',
                uriParams: {
                  'p_parent_equipment_id': $variables.RowData.equipment_id,
                },
                body: updatepayload,
              });
              
            }, { mode: 'serial' });

            

          }
        }
        if ($variables.editPairingADP.data) {
          if($variables.editPairingADP.data.length>0){
            const results4 = await ActionUtils.forEach($variables.editPairingADP.data, async (item, index) => {
               updatepayload.p_priority = item.priority;
              updatepayload.p_unit_of_measure = "";
              updatepayload.p_quantity = "";
              updatepayload.p_equipment_name = item.lkpvalue;
              updatepayload.p_equipment_number = item.equipment_number;
              updatepayload.p_equipment_id = item.lkpid;
              updatepayload.p_update_type = "EQP_SUGGESTION";

              const response5 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/putGetEquipmentMasterDetail',
                uriParams: {
                  'p_parent_equipment_id': $variables.RowData.equipment_id,
                },
                body: updatepayload,
              });
            }, { mode: 'serial' });
            

          }
        }
       

        if (response.ok) {
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Equipment Master Details Updated',
            displayMode: 'transient',
            type: 'confirmation',
          });

          await Actions.navigateBack(context, {
          });
        }
        else {
          const loadingDialogClose3 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Update Equipment Master Data',
            type: 'error',
            displayMode: 'transient',
          });

        }





      } else {
        const toEquipmentRequisition = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'equipment-requisition',
          page: 'equipment-requisition-start',
        });
      }

      // if (responseVar.ok) {

      //   const loadingDialogClose = await Actions.callComponentMethod(context, {
      //     selector: '#loadingDialog',
      //     method: 'close',
      //   });
      //   await Actions.fireNotificationEvent(context, {
      //     summary: 'Equipment Master Details Updated',
      //     type: 'confirmation',
      //     displayMode: 'transient',
      //   });

      //   await Actions.navigateBack(context, {
      //   });

      // } else {
      //   await Actions.fireNotificationEvent(context, {
      //     summary: 'Failed To Update Master Data',
      //     type: 'error',
      //     displayMode: 'transient',
      //   });

      // }

    }
  }

  return PrimaryBtnAction;
});
