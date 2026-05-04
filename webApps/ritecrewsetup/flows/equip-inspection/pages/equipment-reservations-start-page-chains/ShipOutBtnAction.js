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

  class ShipOutBtnAction extends ActionChain {

    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $and, $eq, $functions } = context;

      let storeApiName;
      let errMsg;
      let pagename = 'equip-inspection';

      try {

        const response10 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getTransferOrder2',
          uriParams: {
            'equipment_name': current.row.equipment_name,
            'request_id': current.row.equipment_request_id,
          },
        });

        $variables.transferOrder = response10.body.items[0].transfer_order_number;

        let payload = {
          "BatchPrefix": "RESTL",
          "ShipFromOrganizationCode": "OAK_PPM",
          "ReleaseStatus": "Unreleased",
          "OrderTypeCode": "TRANSFER_ORDER",
          "OrderType": "Transfer order",
          "OrderNumber": $variables.transferOrder,
          "StagingSubinventory": "SUP_SUBINV",
          "AutoPickConfirmFlag": false,
          "TradeComplianceMethod": "NONE",
          "ShipConfirmRule": "NONE",
          "CreateShipmentsFlag": "true",
          "ShipmentCreationCriteria": "Within an order",
          "AutomaticallyPackFlag": "false",
          "AppendShipmentsFlag": "false",
          "PickReleaseFlag": true,
          "ReleaseMode": "ONLINE",
          "SourceSystemName": "OPS"
        };

        storeApiName = 'FscmRestApiResources11_13_18_05PickWaves';

        const response12 = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05PickWaves',
          body: payload,
        });

        if (!response12.ok) {
          errMsg =
            response12.body?.detail ||
            response12.body?.message ||
            (typeof response12.body === 'string' ? response12.body : null) ||
            response12.statusText ||
            'Unknown API Error';

          throw new Error(errMsg);
        }

        await Actions.fireNotificationEvent(context, {
          summary: 'Picking Initiated',
          type: 'confirmation',
          displayMode: 'transient',
        });

        if (current.row.track_inventory_item === "Y") {

          await Actions.callComponentMethod(context, {
            selector: '#shipout',
            method: 'open',
          });

        } else {

          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });

          const initialUpdatePayload = {
            'equipment_request_id': current.row.equipment_request_id,
            'inspection_stage': 'Eqp Manager - Check Out',
            'eqp_master_status': 'EQP MANAGER INSPECTION',
          };

          storeApiName = 'EQPInspectionApproval';

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



          const loadingDialogOpen = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });

          let obj = {
            "Message": "FYI- Request No." + current.row.eqp_request_number + "  has been shipped by. " + ($application.variables.user || $application.user.username),
            "TaskCreator": $application.variables.user || $application.user.username,
            "Role_Name": "OII Equipment Requestor"
          };

          storeApiName = 'EQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report';

          const response2 = await Actions.callRest(context, {
            endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',
            body: obj,
            headers: {
              'R_PAGE_NAME': pagename,
              'R_TRACE_ID': $application.variables.traceIdDisplay || null,
              'R_USER_NAME': $application.user.username,
            },
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

          const response7 = await Actions.callRest(context, {
            endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_EMAIL_NOTIFICATI1_0TriggerEmailNotification',
            uriParams: {
              'p_request_number': current.row.eqp_request_number,
              pageId: $application.currentPage.id,
              'USER_NAME': $application.variables.user || $application.user.username,
            },
          });

          if (current.row.maintenance_asset_id) {

            storeApiName = 'FscmRestApiResources11_13_18_05AssetHierarchiesLOVAssetId';

            const response8 = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/patchFscmRestApiResources11_13_18_05AssetHierarchiesLOVAssetId',
              uriParams: {
                AssetId: current.row.maintenance_asset_id,
              },
            });

            if (!response8.ok) {
              errMsg =
                response8.body?.detail ||
                response8.body?.message ||
                (typeof response8.body === 'string' ? response8.body : null) ||
                response8.statusText ||
                'Unknown API Error';

              throw new Error(errMsg);
            }

            if (response8.ok) {
              const response9 = await Actions.callRest(context, {
                endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_ASSETMAINTENANCE1_0GetAssets',
                uriParams: {
                  'p_asset_number': response8.body.ParentAssetNumber,
                },
              });

              if (response9.ok) {
                if (response9.body && response9.body.items?.length > 0) {

                  const result = await $functions.getmatchedRecords(
                    response9.body.items,
                    response8.body.ParentAssetNumber,
                    current.row.maintenance_asset_number
                  );

                  if (result) {
                    await ActionUtils.forEach(result, async (itm) => {
                      await Actions.callRest(context, {
                        endpoint: 'fusion_cloud/deleteFscmRestApiResources11_13_18_05InstalledBaseAssetsAssetIdChildRelationshipsRelationshipId',
                        uriParams: {
                          AssetId: response8.body.ParentAssetId,
                          RelationshipId: itm.RELATIONSHIP_ID,
                        },
                      });
                    }, { mode: 'serial' });
                  }
                }
              }
            }
          }

          await Actions.callChain(context, {
            chain: 'SearchBtnAction',
          });

          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Shipped Out Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });
        }

      } catch (error) {

        const errorMessage =
          error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          'Unknown API Error';

        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': pagename,
            'R_TRACE_ID': $application.variables.traceIdDisplay || null,
            'R_USER_NAME': $application.user.username,
          },
          body: {
            'p_api_name': storeApiName,
            'p_debug_message': errorMessage,
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });

      }
    }
  }

  return ShipOutBtnAction;
});