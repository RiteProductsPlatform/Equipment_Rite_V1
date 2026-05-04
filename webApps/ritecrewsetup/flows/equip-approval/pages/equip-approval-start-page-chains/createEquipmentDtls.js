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

  class createEquipmentDtls extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

let storeApiName;
let errMsg;
let pageName = 'equip-approval';

      try {
      const validateGroup = await $application.functions.validateGroup('povalid');

      if (validateGroup === "valid") {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getEquipmentMaster',
          uriParams: {
            'p_equipment_id': $variables.eqpnums[0].equipment_id,
          },
        });

        if (response.body.items) {

          if (response.body.items[0].organization_name === $variables.poVariables.org) {

            const createMasterPayload = await $functions.createMasterPayload(response.body.items[0], $variables.selectionrow, $variables.poVariables);

            storeApiName = 'postGetEquipmentMasterDetail';

            const response2 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postGetEquipmentMasterDetail',
              body: createMasterPayload,
              headers: {
                'R_PAGE_NAME': pageName,
                'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                'R_USER_NAME': $application.user.username,
              },
            });
            if (!response2.ok)
{
errMsg =response2.body?.detail ||response2.body?.message ||(typeof response2.body === 'string' ? response2.body : null) ||response2.statusText ||'API Error';
throw new Error(errMsg);
}

            const posaveobj = await $functions.posaveobj($variables.poVariables);

            storeApiName = 'putEquipmentMaster';

        const response13 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEquipmentMaster',
          uriParams: {
            'p_equipment_id': $variables.eqpnums[0].equipment_id,
          },
          body: posaveobj,
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
        });

        if (!response13.ok)
{
errMsg =response13.body?.detail ||response13.body?.message ||(typeof response13.body === 'string' ? response13.body : null) ||response13.statusText ||'API Error';
throw new Error(errMsg);
}

            if (response2.ok) {
              let obj = {

                "addressline1": $variables.selectionrow.addressline1 || "",
                "addressline2": $variables.selectionrow.addressline2 || "",
                "business_unit_id": String($variables.selectionrow.business_unit_id) || "",
                "business_unit_name": $variables.selectionrow.business_unit || "",
                "city": $variables.selectionrow.city || "",
                "country": $variables.selectionrow.country || "",
                "efforts_per_day": String($variables.selectionrow.total_efforts_perday) || "",
                "end_date": $functions.transformDate($variables.selectionrow.effective_end_date) || "",
                "equip_req_quantity": $variables.selectionrow.equip_req_quantity || "",
                "equipment_class": $variables.selectionrow.equipment_resource_class || "",
                "equipment_name": $variables.eqpnums[0].equipment_name || "",
                "equipment_number": $variables.eqpnums[0].equipment_number || "",
                "equipment_type": "",
                "file_attachment": "",
                "inventory_org": "",
                "inventory_org_id": "",
                "location": $variables.selectionrow.location || "",
                "location_id": "",
                "project_id": String($variables.selectionrow.project_id) || "",
                "project_name": $variables.selectionrow.project_name || "",
                "project_number": $variables.selectionrow.project_number || "",
                "request_type": "Project",
                "requestor_name": "",
                "schedule_cost_rate": "",
                "soft_reservation": "",
                "start_date": $functions.transformDate($variables.selectionrow.effective_start_date) || "",
                "task_id": String($variables.selectionrow.task_id) || "",
                "task_name": $variables.selectionrow.task_name || "",
                "task_number": $variables.selectionrow.task_number || "",
                "utilization": $functions.getUtilization($variables.selectionrow.total_efforts_perday) || "",
                "zipcode": $variables.selectionrow.zipcode || "",
                "bill_rate": $variables.selectionrow.bill_rate || 0
              };

              storeApiName = 'postEQPRite_ReqHeaderSubmit';

              const response4 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/postEQPRite_ReqHeaderSubmit',
                headers: {
                  'R_PAGE_NAME': pageName,
                  'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                  'R_USER_NAME': $application.user.username,
                },
              });

              if (!response4.ok)
{
errMsg =response4.body?.detail ||response4.body?.message ||(typeof response4.body === 'string' ? response4.body : null) ||response4.statusText ||'API Error';
throw new Error(errMsg);
}
              if (response4.ok) {
                storeApiName = 'postEQPRite_RequestCartSubmit';

                const response5 = await Actions.callRest(context, {
                  endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestCartSubmit',
                  body: obj,
                  headers: {
                    'R_PAGE_NAME': pageName,
                    'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                    'R_USER_NAME': $application.user.username,
                  },
                });

                if (!response5.ok)
{
errMsg =response5.body?.detail ||response5.body?.message ||(typeof response5.body === 'string' ? response5.body : null) ||response5.statusText ||'API Error';
throw new Error(errMsg);
}
                if (response5.ok) {
                  const response8 = await Actions.callRest(context, {
                    endpoint: 'TimeRite_Ords_Service/getEQPRite_RequestNumberDetails',
                    uriParams: {
                      'p_eqp_request_number': response4.body.eqp_request_number,
                    },
                  });

                  let approveObj = {
                    "equipment_request_id": response8.body.items[0].equipment_request_id,
                    "eqp_master_status": "REQUESTED",
                    "p_equipment_number": response8.body.items[0].equipment_number,
                    "p_equipment_id": response8.body.items[0].equipment_id,
                    "p_auto_costing": "No"
                  };

                  storeApiName = 'putGetEqpRequestApproval';

                   const response7 = await Actions.callRest(context, {
                     endpoint: 'TimeRite_Ords_Service/putGetEqpRequestApproval',
                     body: approveObj,
                     headers: {
                       'R_PAGE_NAME': pageName,
                       'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                       'R_USER_NAME': $application.user.username,
                     },
                   });

if (!response7.ok)
{
errMsg =response7.body?.detail ||response7.body?.message ||(typeof response7.body === 'string' ? response7.body : null) ||response7.statusText ||'API Error';
throw new Error(errMsg);
}

                  if (response7.ok) {
                    

                    await Actions.fireNotificationEvent(context, {
                      type: 'confirmation',
                      displayMode: 'transient',
                      summary: 'The equipment has been successfully created',
                      message: "Request Number" + " " + response4.body.eqp_request_number,
                    });

                    const approverejectDlgClose2 = await Actions.callComponentMethod(context, {
                      selector: '#approverejectDlg',
                      method: 'close',
                    });
                  }else{

                    await Actions.fireNotificationEvent(context, {
                      summary: 'Failed to create Equipment',
                      type: 'error',
                      displayMode: 'transient',
                    });
                  }
                } else {

                  await Actions.fireNotificationEvent(context, {
                    summary: 'Failed to create Equipment',
                    type: 'error',
                    displayMode: 'transient',
                  });
                }
              }




              const pOEditDialogClose = await Actions.callComponentMethod(context, {
                selector: '#POEditDialog',
                method: 'close',
              });
            } else {
              await Actions.fireNotificationEvent(context, {
                summary: 'Failed to create Equipment',
                type: 'error',
                displayMode: 'transient',
              });

            }
          } else {


            const createMasterPayload2 = await $functions.createMasterPayload(response.body.items[0], $variables.selectionrow, $variables.poVariables);

            storeApiName = 'postGetEquipmentMasterDetail';

            const response3 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postGetEquipmentMasterDetail',
              body: createMasterPayload2,
              headers: {
                'R_PAGE_NAME': pageName,
                'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                'R_USER_NAME': $application.user.username,
              },
            });
            if (!response3.ok)
{
errMsg =response3.body?.detail ||response3.body?.message ||(typeof response3.body === 'string' ? response3.body : null) ||response3.statusText ||'API Error';
throw new Error(errMsg);
}

 const posaveobj = await $functions.posaveobj($variables.poVariables);

            storeApiName = 'putEquipmentMaster';

        const response14 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEquipmentMaster',
          uriParams: {
            'p_equipment_id': $variables.eqpnums[0].equipment_id,
          },
          body: posaveobj,
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
        });

if (!response14.ok)
{
errMsg =response14.body?.detail ||response14.body?.message ||(typeof response14.body === 'string' ? response14.body : null) ||response14.statusText ||'API Error';
throw new Error(errMsg);
}
            if (response3.ok) {
              let obj = {

                "addressline1": $variables.selectionrow.addressline1 || "",
                "addressline2": $variables.selectionrow.addressline2 || "",
                "business_unit_id": String($variables.selectionrow.business_unit_id) || "",
                "business_unit_name": $variables.selectionrow.business_unit || "",
                "city": $variables.selectionrow.city || "",
                "country": $variables.selectionrow.country || "",
                "efforts_per_day": String($variables.selectionrow.total_efforts_perday) || "",
                "end_date": $functions.transformDate($variables.selectionrow.effective_end_date) || "",
                "equip_req_quantity": $variables.selectionrow.equip_req_quantity || "",
                "equipment_class": $variables.selectionrow.equipment_resource_class || "",
                "equipment_name": $variables.eqpnums[0].equipment_name || "",
                "equipment_number": $variables.eqpnums[0].equipment_number || "",
                "equipment_type": "",
                "file_attachment": "",
                "inventory_org": "",
                "inventory_org_id": "",
                "location": $variables.selectionrow.location || "",
                "location_id": "",
                "project_id": String($variables.selectionrow.project_id) || "",
                "project_name": $variables.selectionrow.project_name || "",
                "project_number": $variables.selectionrow.project_number || "",
                "request_type": "Project",
                "requestor_name": "",
                "schedule_cost_rate": "",
                "soft_reservation": "",
                "start_date": $functions.transformDate($variables.selectionrow.effective_start_date) || "",
                "task_id": String($variables.selectionrow.task_id) || "",
                "task_name": $variables.selectionrow.task_name || "",
                "task_number": $variables.selectionrow.task_number || "",
                "utilization": $functions.getUtilization($variables.selectionrow.total_efforts_perday) || "",
                "zipcode": $variables.selectionrow.zipcode || "",
                "bill_rate": $variables.selectionrow.bill_rate || 0
              };

              storeApiName = 'postEQPRite_ReqHeaderSubmit';

              const response4 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/postEQPRite_ReqHeaderSubmit',
                headers: {
                  'R_PAGE_NAME': pageName,
                  'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                  'R_USER_NAME': $application.user.username,
                },
              });
if (!response4.ok)
{
errMsg =response4.body?.detail ||response4.body?.message ||(typeof response4.body === 'string' ? response4.body : null) ||response4.statusText ||'API Error';
throw new Error(errMsg);
}


              if (response4.ok) {
                storeApiName = 'postEQPRite_RequestCartSubmit';

                const response5 = await Actions.callRest(context, {
                  endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestCartSubmit',
                  body: obj,
                  headers: {
                    'R_PAGE_NAME': pageName,
                    'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                    'R_USER_NAME': $application.user.username,
                  },
                });
                if (!response5.ok)
{
errMsg =response5.body?.detail ||response5.body?.message ||(typeof response5.body === 'string' ? response5.body : null) ||response5.statusText ||'API Error';
throw new Error(errMsg);
}
                if (response5.ok) {
                  const response6 = await Actions.callRest(context, {
                    endpoint: 'TimeRite_Ords_Service/getEQPRite_RequestNumberDetails',
                    uriParams: {
                      'p_eqp_request_number': response4.body.eqp_request_number,
                    },
                  });
                  let approveObj = {
                    "equipment_request_id": response6.body.items[0].equipment_request_id,
                    "eqp_master_status": "REQUESTED",
                    "p_equipment_number": response6.body.items[0].equipment_number,
                    "p_equipment_id": response6.body.items[0].equipment_id,
                    "p_auto_costing": "No"
                  };

                  storeApiName = 'putGetEqpRequestApproval';
                  const response9 = await Actions.callRest(context, {
                    endpoint: 'TimeRite_Ords_Service/putGetEqpRequestApproval',
                    body: approveObj,
                    headers: {
                      'R_PAGE_NAME': pageName,
                      'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                      'R_USER_NAME': $application.user.username,
                    },
                  });

if (!response9.ok)
{
errMsg =response9.body?.detail ||response9.body?.message ||(typeof response9.body === 'string' ? response9.body : null) ||response9.statusText ||'API Error';
throw new Error(errMsg);
}

                  if (response9.ok) {
                    
                    let approveRequestObj={
    "equipment_request_id": response6.body.items[0].equipment_request_id,
    "inspection_stage": "Project - Check In",
    "eqp_master_status": "EQP PROJECT INSPECTION"
};

                    storeApiName = 'postEQPInspectionApproval';

                    const response10 = await Actions.callRest(context, {
                      endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
                      body: approveRequestObj,
                      headers: {
                        'R_PAGE_NAME': pageName,
                        'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                        'R_USER_NAME': $application.user.username,
                      },
                    });
                    if (!response10.ok)
{
errMsg =response10.body?.detail ||response10.body?.message ||(typeof response10.body === 'string' ? response10.body : null) ||response10.statusText ||'API Error';
throw new Error(errMsg);
}

                    if (response10.ok) {

                      await Actions.fireNotificationEvent(context, {
                        type: 'confirmation',
                        displayMode: 'transient',
                        summary: 'The equipment has been successfully created',
                        message: "Request Number" + " " + response4.body.eqp_request_number,
                      });

                      const approverejectDlgClose = await Actions.callComponentMethod(context, {
                        selector: '#approverejectDlg',
                        method: 'close',
                      });
                    }
                    else{


                      await Actions.fireNotificationEvent(context, {
                        summary: 'Failed to create Equipment',
                        type: 'error',
                        displayMode: 'transient',
                      });
                    }
                  }else{

                    await Actions.fireNotificationEvent(context, {
                      summary: 'Failed to create Equipment',
                      type: 'error',
                      displayMode: 'transient',
                    });
                  }
                } else {

                  await Actions.fireNotificationEvent(context, {
                    summary: 'Failed to create Equipment',
                    type: 'error',
                    displayMode: 'transient',
                  });
                }
              }

              const pOEditDialogClose2 = await Actions.callComponentMethod(context, {
                selector: '#POEditDialog',
                method: 'close',
              });
            } else {
              await Actions.fireNotificationEvent(context, {
                summary: 'Failed To Create Equipment',
                type: 'error',
                displayMode: 'transient',
              });

            }
          }
        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please fill all required fields',
          displayMode: 'transient',
          type: 'error',
        });
      }

      } catch (error) {

        let errMessage =
  error?.message ||
  error?.body?.detail ||
  error?.body?.message ||
  (typeof error?.body === 'string' ? error.body : null) ||
  JSON.stringify(error);
 
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': pageName,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
                'p_api_name': storeApiName,
                'p_debug_message':errMessage
        },
        });
 
        await Actions.fireNotificationEvent(context, {
          summary: 'ERROR',
          message: errMessage,
          displayMode: 'persist',
          type: 'error',
        });
      } finally {
                const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }


    }
  }

  return createEquipmentDtls;
});
