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

  class SaveAndCloseActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables, $functions, $eq } = context;

      let api_name = "getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates";
      let page_name = "Equipment Master";

      try {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response4 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
        });

        if (!response4.ok) {

          let errMsg =
            response4.body?.detail ||
            response4.body?.message ||
            (typeof response4.body === 'string'
              ? response4.body
              : null) ||
            response4.statusText ||
            'Unknown API Error';

          throw new Error(errMsg);
        }

        const callFunctionResult = await $page.functions.createPayloadMasterTab(
          $page.variables.MasterTabObj,
          $page.variables.AssetsTabObj,
          $page.variables.ManufacturerTabObj,
          $page.variables.LocationTabObj,
          $page.variables.LeasingTabObj,
          $page.variables.CostingTabObj,
          $page.variables.fileObj,
          $variables.selectednonlabourResourceorg,
          $variables.assetobj,
          $variables.dummyMainanenencaName,
          response4.body.items,
          $variables.selectedorgValueObj
        );

        if (callFunctionResult !== undefined || callFunctionResult !== "") {

          api_name = "postGetEquipmentMasterDetail";

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postGetEquipmentMasterDetail',

            headers: {
              R_TRACE_ID: $application.variables.traceIdDisplay,
              R_USER_NAME: $application.user.username,
              R_PAGE_NAME: page_name
            },

            body: callFunctionResult,
            contentType: 'application/json',
          });

          if (!response.ok) {

            let errMsg =
              response.body?.detail ||
              response.body?.message ||
              (typeof response.body === 'string'
                ? response.body
                : null) ||
              response.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }

          const results3 = await Promise.all([
            async () => {
debugger;
              if ($variables.selectednonlabourResource) {

                const results2 = await ActionUtils.forEach(
                  $variables.selectednonlabourResource,

                  async (item, index) => {

                    callFunctionResult.p_expendituretypename = item.expendituretypename;
                    callFunctionResult.p_expendituretypeid = item.expendituretypeid;
                    callFunctionResult.p_non_labor_resource = item.name;
                    callFunctionResult.p_non_labor_resource_org = item.organization;
                    callFunctionResult.p_equipment_id = response.body.equipment_id;

                    //  callFunctionResult.p_update_type = "EQP_NONLABOR";

                    api_name = "postEQPRite_MasterLines";

                    const response5 = await Actions.callRest(context, {
                      endpoint: 'TimeRite_Ords_Service/postEQPRite_MasterLines',

                      headers: {
                        R_TRACE_ID: $application.variables.traceIdDisplay,
                        R_USER_NAME: $application.user.username,
                        R_PAGE_NAME: page_name
                      },

                      body: callFunctionResult,
                    });

                    if (!response5.ok) {

                      let errMsg =
                        response5.body?.detail ||
                        response5.body?.message ||
                        (typeof response5.body === 'string'
                          ? response5.body
                          : null) ||
                        response5.statusText ||
                        'Unknown API Error';

                      throw new Error(errMsg);
                    }

                  },

                  { mode: 'serial' }
                );
              }
            },

            async () => {

              if ($variables.substituteADP.data) {

                if ($variables.substituteADP.data.length > 0) {

                  const results4 = await ActionUtils.forEach(
                    $variables.substituteADP.data,

                    async (item, index) => {

                      let obj = {
                        "p_equipment_id": item.lkpid,
                        "p_equipment_number": item.equipment_number,
                        "p_equipment_name": item.equipment_name,
                        "p_serial_number": "",
                        "p_linked_to_parent": "",
                        "p_parent_equipment_id": response.body.equipment_id,
                        "p_parent_equipment_number": "",
                        "p_parent_equipment_name": "",
                        "p_priority": item.priority,
                        "p_unit_of_measure": item.uom,
                        "p_quantity": item.qunatity,
                        "p_created_by": $application.user.username || $application.variables.user,
                        "p_last_updated_by": $application.user.username || $application.variables.user
                      };

                      api_name = "postEQPRite_SubstituteDetails";

                      const response8 = await Actions.callRest(context, {
                        endpoint: 'TimeRite_Ords_Service/postEQPRite_SubstituteDetails',

                        headers: {
                          R_TRACE_ID: $application.variables.traceIdDisplay,
                          R_USER_NAME: $application.user.username,
                          R_PAGE_NAME: page_name
                        },

                        body: obj,
                      });

                      if (!response8.ok) {

                        let errMsg =
                          response8.body?.detail ||
                          response8.body?.message ||
                          (typeof response8.body === 'string'
                            ? response8.body
                            : null) ||
                          response8.statusText ||
                          'Unknown API Error';

                        throw new Error(errMsg);
                      }

                    },

                    { mode: 'serial' }
                  );
                }
              }
            },

            async () => {

              if ($variables.paringADP.data) {

                if ($variables.paringADP.data.length > 0) {

                  const results5 = await ActionUtils.forEach(
                    $variables.paringADP.data,

                    async (item, index) => {

                      let obj = {
                        "p_equipment_id": item.lkpid,
                        "p_equipment_number": item.equipment_number,
                        "p_equipment_name": item.equipment_name,
                        "p_serial_number": "",
                        "p_linked_to_parent": "",
                        "p_parent_equipment_id": response.body.equipment_id,
                        "p_parent_equipment_number": "",
                        "p_parent_equipment_name": "",
                        "p_priority": item.priority,
                        "p_unit_of_measure": "",
                        "p_quantity": "",
                        "p_created_by": $application.user.username || $application.variables.user,
                        "p_last_updated_by": $application.user.username || $application.variables.user
                      };

                      api_name = "postEQPRite_SuggestionDetails";

                      const response7 = await Actions.callRest(context, {
                        endpoint: 'TimeRite_Ords_Service/postEQPRite_SuggestionDetails',

                        headers: {
                          R_TRACE_ID: $application.variables.traceIdDisplay,
                          R_USER_NAME: $application.user.username,
                          R_PAGE_NAME: page_name
                        },

                        body: obj,
                      });

                      if (!response7.ok) {

                        let errMsg =
                          response7.body?.detail ||
                          response7.body?.message ||
                          (typeof response7.body === 'string'
                            ? response7.body
                            : null) ||
                          response7.statusText ||
                          'Unknown API Error';

                        throw new Error(errMsg);
                      }

                    },

                    { mode: 'serial' }
                  );
                }
              }
            },

            async () => {

              let payload = {
                "dummy": ""
              };

              api_name = "postEQUIPMENT_RITEEQP_FA_COSTDETAILS1_0InsertDataintoDB";

              const response10 = await Actions.callRest(context, {
                endpoint: 'EQUIPMENT_RITE_OIC/postEQUIPMENT_RITEEQP_FA_COSTDETAILS1_0InsertDataintoDB',
                headers: {
                  'R_TRACE_ID': $application.variables.traceIdDisplay,
                  'R_USER_NAME': $application.user.username,
                  'R_PAGE_NAME': page_name,
                },
                body: payload,
              });

              if (!response10.ok) {

                let errMsg =
                  response10.body?.detail ||
                  response10.body?.message ||
                  (typeof response10.body === 'string'
                    ? response10.body
                    : null) ||
                  response10.statusText ||
                  'Unknown API Error';

                throw new Error(errMsg);
              }

              //  callFunctionResult.p_equipment_id = response.body.equipment_id;

              // const response6 = await Actions.callRest(context, {
              //   endpoint: 'TimeRite_Ords_Service/postEQPRite_MasterLines',
              //   body: callFunctionResult,
              // });

            },

          ].map(sequence => sequence()));

          await Actions.fireNotificationEvent(context, {
            summary: 'Equipment saved successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });

          if ($page.variables.AssetsTabObj.assetNumber) {

            api_name = "MaintenanceForecasts";

            const response2 = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/getMaintenanceForecasts',
            });

            if (!response2.ok) {

              let errMsg =
                response2.body?.detail ||
                response2.body?.message ||
                (typeof response2.body === 'string'
                  ? response2.body
                  : null) ||
                response2.statusText ||
                'Unknown API Error';

              throw new Error(errMsg);
            }

            if (response2.body.items.length > 0) {

              const results = await ActionUtils.forEach(
                response2.body.items,

                async (item, index) => {

                  const maintenancePaylodGenerator =
                    await $functions.maintenancePaylodGenerator(
                      response2.body.items[index],
                      undefined,
                      $variables.MasterTabObj.equipment_Name,
                      $variables.MasterTabObj.equipment_Class,
                      $variables.MasterTabObj.status,
                      $application.user.email
                    );

                  api_name = "EqpMasterWorkOrder";

                  const response3 = await Actions.callRest(context, {
                    endpoint: 'TimeRite_Ords_Service/EqpMasterWorkOrder',

                    headers: {
                      R_TRACE_ID: $application.variables.traceIdDisplay,
                      R_USER_NAME: $application.user.username,
                      R_PAGE_NAME: page_name
                    },

                    body: maintenancePaylodGenerator,
                  });

                  if (!response3.ok) {

                    let errMsg =
                      response3.body?.detail ||
                      response3.body?.message ||
                      (typeof response3.body === 'string'
                        ? response3.body
                        : null) ||
                      response3.statusText ||
                      'Unknown API Error';

                    throw new Error(errMsg);
                  }

                },

                { mode: 'serial' }
              );
            }
          }

          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.navigateBack(context, {
          });

        }
        else {

          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Error occurred while saving Equipment',
            type: 'error',
          });

        }

        const loadingDialogClose3 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

      }

      catch (error) {

        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const errorMessage =
          error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',

          headers: {
            R_TRACE_ID: $application.variables.traceIdDisplay || null,
            R_USER_NAME: $application.user.username,
            R_PAGE_NAME: page_name
          },

          body: {
            p_api_name: api_name,
            p_debug_message: errorMessage
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });

        return;
      }

    }
  }

  return SaveAndCloseActionChain;
});