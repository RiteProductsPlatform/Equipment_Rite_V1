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

  class ShipoutSaveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {object} params.current
     */
    async run(context, { event, originalEvent, current }) {
      const { $page, $flow, $application, $constants, $variables, $eq, $functions } = context;


      let storeApiName ;
      let errMsg ;
      let pagename = 'Equipment Inspection';



      const validateGroup = await $application.functions.validateGroup('shipoutValid');

      if (validateGroup === "valid") {

        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

         try {

        const postinventoryStaged = await $functions.postinventoryStaged($variables.selectedrow, $variables.shipoutObj);

         storeApiName = 'InventoryStagedTransactions';

        const response10 = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/post11_13_18_05InventoryStagedTransactions',
          body: postinventoryStaged,
         
        });

        if (!response10.ok) {
             errMsg =
              response10.body?.detail ||
              response10.body?.message ||
              (typeof response10.body === 'string' ? response10.body : null) ||
              response10.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        }

           if (response10.ok && response10.body && !response10.body.ErrorExplanation) {

          const results = await Promise.all([
            async () => {

              const initialUpdatePayload = {
                'equipment_request_id': current.equipment_request_id || "",
                'inspection_stage': 'Eqp Manager - Check Out',
                'inter_org_quantity_uom': $variables.shipoutObj.quantity,
                'inter_org_quantity': $variables.shipoutObj.uom,
                'eqp_master_status': 'EQP MANAGER INSPECTION',
              };

              storeApiName = 'EQPInspectionApproval'

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
            },
           
            async () => {

              let obj =
              {
                "Message": "FYI- Request No." + current.eqp_request_number + "  has been shipped by. " + $application.variables.user || $application.user.username,
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
                  'p_request_number': current.eqp_request_number,
                  pageId: $application.currentPage.id,
                  'USER_NAME': $application.variables.user || $application.user.username,
                },
              });
            },
          ].map(sequence => sequence()));
          if (current.maintenance_asset_id) {

            const response8 = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/patchFscmRestApiResources11_13_18_05AssetHierarchiesLOVAssetId',
              uriParams: {
                AssetId: current.maintenance_asset_id,
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

            if (response8.ok && response8.body.ParentAssetNumber) {

              const response9 = await Actions.callRest(context, {
                endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_ASSETMAINTENANCE1_0GetAssets',
                // requestTransformOptions: {
                //   filter: {
                //     op: '$eq',
                //     attribute: 'parent_asset_number',
                //     value: response8.body.ParentAssetNumber,
                //   },
                // },
                uriParams: {
                  'p_asset_number': response8.body.ParentAssetNumber,
                },
              });
// debugger
              if (response9.ok) {
                if (response9.body !== "" && response9.body !== undefined && response9.body !== "Unable to parse response as JSON, content type application/json : SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input") {
                  if (response9.body.items.length > 0) {
                    const result = await $functions.getmatchedRecords(response9.body.items, response8.body.ParentAssetNumber, current.maintenance_asset_number);
                    if (result) {

                      const results3 = await ActionUtils.forEach(result, async (itm, indx) => {

                        const response6 = await Actions.callRest(context, {
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
            if (current.maintenance_asset_number) {
              if (current.inventory_location_flag === "Y" && current.inventory_org_id && current.location_id) {
                let payload = {
                  "OperatingOrganizationId": current.inventory_org_id,
                  "CurrentLocationId": current.location_id,
                  "CurrentLocationContext": "ORA_INTERNAL_LOCATION"
                };

                storeApiName = 'MaintenanceAssetsAssetId';

                const response3 = await Actions.callRest(context, {
                  endpoint: 'fusion_cloud/patchFscmRestApiResources11_13_18_05MaintenanceAssetsAssetId',
                  uriParams: {
                    AssetId: current.maintenance_asset_id,
                  },
                  body: payload,
                 
                });

                if (!response3.ok) {
            errMsg =
              response3.body?.detail ||
              response3.body?.message ||
              (typeof response3.body === 'string' ? response3.body : null) ||
              response3.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        }
                const response4 = await Actions.callRest(context, {
                  endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_ASSETMAINTENANCE1_0GetAssets',
                  uriParams: {
                    'p_asset_number': current.maintenance_asset_number,
                  },
                });
                if (response4.ok) {

                  if (response4.body !== "" && response4.body !== undefined && response4.body !== "Unable to parse response as JSON, content type application/json : SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input") {
                    if (response4.body.items.length >= 1) {

                      const results2 = await ActionUtils.forEach(response4.body.items, async (item1, index1) => {
                        storeApiName = 'MaintenanceAssetsAssetId';
                        const response5 = await Actions.callRest(context, {
                          endpoint: 'fusion_cloud/patchFscmRestApiResources11_13_18_05MaintenanceAssetsAssetId',
                          uriParams: {
                            AssetId: item1.asset_id,
                          },
                          body: payload,
                         
                        });
                        if (!response5.ok) {
              errMsg =
              response5.body?.detail ||
              response5.body?.message ||
              (typeof response5.body === 'string' ? response5.body : null) ||
              response5.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        }
                      }, { mode: 'serial' });
                    }

                  }
                }
              }
            }
          }
          await Actions.callChain(context, {
            chain: 'SearchBtnAction',
          });

          // const loadingDialogClose = await Actions.callComponentMethod(context, {
          //   selector: '#loadingDialog',
          //   method: 'close',
          // });

          const shipoutClose = await Actions.callComponentMethod(context, {
            selector: '#shipout',
            method: 'close',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$variables.shipoutObj',
            ],
          });
          await Actions.fireNotificationEvent(context, {
            summary: 'Shipped Out Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Initial status update failed',
            displayMode: 'transient',
            type: 'error',
          });
          // const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          //   selector: '#loadingDialog',
          //   method: 'close',
          // });
          return;

        }

        } catch (error) {

          const errorMessage =
            error?.message ||
            error?.body?.detail ||
            error?.body?.message ||
            "Unknown API Error";

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

        } finally {

          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

        }


      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please fill all required fields',
          type: 'error',
          displayMode: 'transient',
        });

      }
    }
  }

  return ShipoutSaveButtonActionChain;
});
