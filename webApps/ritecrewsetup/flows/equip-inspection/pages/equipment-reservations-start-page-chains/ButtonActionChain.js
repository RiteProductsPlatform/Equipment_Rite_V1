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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $eq, $or } = context;

      if ($variables.inspectionheaderobj.filterfield === "Request Number") {
        const response1 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
          uriParams: {
            'request_type': 'Project',
          },
          requestTransformOptions: {
            filter: {
              op: '$eq',
              attribute: 'eqp_request_number',
              value: $variables.inspectionheaderobj.searchfield,
            },
          },
        });

        $variables.tableADP.data = response1.body.items;
        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.tableADP,
        });

      } else if ($variables.inspectionheaderobj.filterfield === "Equipment Name") {
        const response1 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
          uriParams: {
            'request_type': 'Project',
          },
          requestTransformOptions: {
            filter: {
              op: '$eq',
              attribute: 'equipment_name',
              value: $variables.inspectionheaderobj.searchfield,
            },
          },
        });
        $variables.tableADP.data = response1.body.items;
        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.tableADP,
        });

      } else if ($variables.inspectionheaderobj.filterfield === "Class") {
        const response1 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
          uriParams: {
            'request_type': 'Project',
          },
          requestTransformOptions: {
            filter: {
              op: '$eq',
              attribute: 'equipment_resource_class',
              value: $variables.inspectionheaderobj.searchfield,
            },
          },
        });
        $variables.tableADP.data = response1.body.items;
        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.tableADP,
        });
      } else if ($variables.inspectionheaderobj.filterfield === "Project Number") {
        const response1 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
          uriParams: {
            'request_type': 'Project',
          },
          requestTransformOptions: {
            filter: {
              op: '$eq',
              attribute: 'project_number',
              value: $variables.inspectionheaderobj.searchfield,
            },
          },
        });
        $variables.tableADP.data = response1.body.items;
        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.tableADP,
        });
      }
      else if ($variables.inspectionheaderobj.filterfield === "Project") {
        const response1 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
          uriParams: {
            'request_type': 'Project',
          },
          requestTransformOptions: {
            filter: {
              op: '$eq',
              attribute: 'project_name',
              value: $variables.inspectionheaderobj.searchfield,
            },
          },
        });
        $variables.tableADP.data = response1.body.items;
        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.tableADP,
        });
      }
      else if ($variables.inspectionheaderobj.filterfield === "Task Name") {
        const response1 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
          uriParams: {
            'request_type': 'Project',
          },
          requestTransformOptions: {
            filter: {
              op: '$eq',
              attribute: 'task_name',
              value: $variables.inspectionheaderobj.searchfield,
            },
          },
        });
        $variables.tableADP.data = response1.body.items;
        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.tableADP,
        });
      }
      else if ($variables.inspectionheaderobj.filterfield === "Expenditure Type") {
        const response1 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
          uriParams: {
            'request_type': 'Project',
          },
          requestTransformOptions: {
            filter: {
              op: '$eq',
              attribute: 'expenditure_type',
              value: $variables.inspectionheaderobj.searchfield,
            },
          },
        });
        $variables.tableADP.data = response1.body.items;
        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.tableADP,
        });
      }
      else if ($variables.inspectionheaderobj.filterfield === "Status") {
        const response1 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
          uriParams: {
            'request_type': 'Project',
          },
          requestTransformOptions: {
            filter: {
              op: '$eq',
              attribute: 'status',
              value: $variables.inspectionheaderobj.searchfield,
            },
          },
        });
        $variables.tableADP.data = response1.body.items;
        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.tableADP,
        });
      }


    }
  }

  return ButtonActionChain;
});
