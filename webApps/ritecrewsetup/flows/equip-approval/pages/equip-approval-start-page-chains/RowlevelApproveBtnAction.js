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

  class RowlevelApproveBtnAction extends ActionChain {
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      let storeApiName;
      let errMsg;
      let pageName = 'equip-approval';
      try {
        let allSuccess = true;

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        storeApiName = 'putGetEqpRequestApproval';

        for (let i = 0; i < $variables.eqpnums.length; i++) {
          const restdata = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/putGetEqpRequestApproval',
            body: {
              equipment_request_id: $page.variables.selectionrow.equipment_request_id,
              eqp_master_status: $variables.eqpstatus,
              p_equipment_number: $variables.eqpnums[i].equipment_number,
              p_equipment_id: $variables.eqpnums[i].equipment_id,
              p_auto_costing: $variables.eqpnums[i].costing === 'Yes' ? 'Yes' : 'No'
            },
            headers: {
              'R_PAGE_NAME': pageName,
              'R_TRACE_ID': $application.variables.traceIdDisplay || null,
              'R_USER_NAME': $application.user.username,
            },
          });

          if (!restdata.ok) {

            errMsg =
              restdata.body?.detail ||
              restdata.body?.message ||
              (typeof restdata.body === 'string' ? restdata.body : null) ||
              restdata.statusText ||
              'API Error';

            throw new Error(errMsg);

          }

          if (!restdata.ok) {
            allSuccess = false;
            break;
          }
        }

        if (allSuccess) {
          const approverejectDlgClose = await Actions.callComponentMethod(context, {
            selector: '#approverejectDlg',
            method: 'close',
          });

          storeApiName = 'postEQPRite_PRWReqDelete';

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_PRWReqDelete',
            uriParams: {
              'p_eqp_request_number': $page.variables.selectionrow.eqp_request_number,
            },
            headers: {
              'R_PAGE_NAME': pageName,
              'R_TRACE_ID': $application.variables.traceIdDisplay || null,
              'R_USER_NAME': $application.user.username,
            },
          });

          if (!response.ok) {
            errMsg = response.body?.detail || response.body?.message || (typeof response.body === 'string' ? response.body : null) || response.statusText || 'API Error';
            throw new Error(errMsg);
          }

          let obj = {
            "Message": "FYI- Request No." + $page.variables.selectionrow.eqp_request_number + "  has been approved by " + $application.variables.user,
            "TaskCreator": $application.variables.user,
            "Role_Name": "OII Equipment Requestor"
          };

          storeApiName = 'postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report';

          const response2 = await Actions.callRest(context, {
            endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',
            body: obj,
            headers: {
              'R_PAGE_NAME': pageName,
              'R_TRACE_ID': $application.variables.traceIdDisplay || null,
              'R_USER_NAME': $application.user.username,
            },
          });

          if (!response2.ok) {
            errMsg = response2.body?.detail || response2.body?.message || (typeof response2.body === 'string' ? response2.body : null) || response2.statusText || 'API Error';
            throw new Error(errMsg);
          }

          if ($variables.assetsTableAdp.data.length >= 1) {
            const results = await ActionUtils.forEach($variables.assetsTableAdp.data, async (item, index) => {
              const assetObj = await $functions.assetObj($variables.selectionrow, item, $variables.eqpRow, $application.variables.user);
              storeApiName = 'postEQPRite_AssetHairarchey';

              const response3 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/postEQPRite_AssetHairarchey',
                body: assetObj,
                headers: {
                  'R_PAGE_NAME': pageName,
                  'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                  'R_USER_NAME': $application.user.username,
                },
              });

              if (!response3.ok) {
                errMsg = response3.body?.detail || response3.body?.message || (typeof response3.body === 'string' ? response3.body : null) || response3.statusText || 'API Error';
                throw new Error(errMsg);
              }
            }, { mode: 'serial' });
          }



          // await Actions.fireNotificationEvent(context, {
          //   summary: 'Submitted Successfully',
          //   type: 'confirmation',
          //   displayMode: 'transient',
          // });

          // Transfer Order + Reservation for each approved equipment
          // for (let i = 0; i < $variables.eqpnums.length; i++) {
          //   await Actions.callChain(context, {
          //     chain: 'CreateTransferOrderAndReservation',
          //     params: {
          //       requestNumber: String($page.variables.selectionrow.eqp_request_number),
          //       equipmentName: $page.variables.selectionrow.equipment_name
          //     }
          //   });
          // }
          // for (let i = 0; i < $variables.eqpnums.length; i++) {

        
          // let supplyrequestpayload = {
          //   "InterfaceBatchNumber": "BATCH123",
          //   "SupplyRequestDate": "2026-04-16T10:00:00.000Z",
          //   "SupplyOrderReferenceNumber": "BATCH123",
          //   "supplyRequestLines": [
          //     {
          //       "InterfaceBatchNumber": "BATCH123",
          //       "ItemNumber": "ITEM001"
          //     }
          //   ]
          // };
          //   const response4 = await Actions.callRest(context, {
          //   endpoint: 'EQUIPMENT_RITE_OIC/postEQUIPMENT_RITESHIPMENTS_TRANSFERORDER1_0Triggersupplyrequest',
          //   body: supplyrequestpayload,
          // });
          // }
        


          const results2 = await ActionUtils.forEach($variables.eqpnums, async (item, index) => {
             const now = new Date();
          const pad = (n, len = 2) => String(n).padStart(len, '0');
          const timestamp = now.getFullYear().toString()
            + pad(now.getMonth() + 1)
            + pad(now.getDate())
            + pad(now.getHours())
            + pad(now.getMinutes())
            + pad(now.getSeconds());
          const batchNumber = 'EQP' + timestamp;

  let supplyrequestpayload = {
            "InterfaceBatchNumber": batchNumber,
            "equipment_id":item.equipment_id,
            "equipment_request_id":$variables.selectionrow.equipment_request_id,
            "equipment_name":item.equipment_name,
            "request_number":$variables.selectionrow.eqp_request_number,
            "SupplyRequestDate":now.toISOString(),
            "SupplyOrderReferenceNumber": batchNumber,
            "supplyRequestLines": [
              {
                "InterfaceBatchNumber": batchNumber,
                "ItemNumber": item.inventory_item
              }
            ]
          };
            const response5 = await Actions.callRest(context, {
              endpoint: 'EQUIPMENT_RITE_OIC/postEQUIPMENT_RITESHIPMENTS_TRANSFERORDER1_0Triggersupplyrequest',
              body: supplyrequestpayload,
            });
          }, { mode: 'serial' });
 await Actions.fireNotificationEvent(context, {
            summary: 'Submitted Successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.callChain(context, {
            chain: 'SearchBtnAction',
          });

        } else {
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Submit Successfully',
            displayMode: 'transient',
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
            'p_debug_message': errMessage
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'ERROR',
          message: errMessage,
          displayMode: 'persist',
          type: 'error',
        });
      } finally {
        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }


    }
  }

  return RowlevelApproveBtnAction;
});