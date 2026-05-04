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

  class Save extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.showFields && $variables.Eqtype === 'Bill Rate Schedule Level') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_BillRateScheduleLevel',
          body: $variables.PostBillRateScheduleLevel,
          responseType: 'create_BillRateScheduleLevel',
        });
          if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostBillRateScheduleLevel',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Costing Details') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_CostingDetails',
          responseType: 'create_CostingDetails',
          body: $variables.PostCostingDetails,
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostCostingDetails',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Crew Type') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_CrewType',
          body: $variables.PostCrewType,
          responseType: 'create_CrewType',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostCrewType',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Equipment Class') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_EqClass',
          body: $variables.PostEqClass,
          responseType: 'create_EqClass',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostEqClass',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Equipment Type') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_EqType',
          body: $variables.PostEqType,
          responseType: 'create_EqType',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostEqType',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Equipment Sub Class') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_Eqsubclass',
          body: $variables.PostEqsubclass,
          responseType: 'create_Eqsubclass',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostEqsubclass',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'EquipmentType') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_EquipmentType',
          body: $variables.PostEquipmentType,
          responseType: 'create_EquipmentType',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostEquipmentType',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Hours Type') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_HoursType',
          body: $variables.PostHoursType,
          responseType: 'create_HoursType',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostHoursType',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Location Options') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_Location_Options',
          body: $variables.PostLocation_Options,
          responseType: 'create_Location_Options',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostLocation_Options',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Master Data') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_MasterData',
          body: $variables.PostMasterData,
          responseType: 'create_MasterData',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostMasterData',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Rounding Threshold') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_RoundingThreshold',
          body: $variables.PostRoundingThreshold,
          responseType: 'create_RoundingThreshold',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostRoundingThreshold',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Status') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_Status',
          body: $variables.PostStatus,
          responseType: 'create_Status',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostStatus',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'Timesheet Entry Method LOV') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_TimesheetEntryMethodLOV',
          body: $variables.PostTimesheetEntryMethodLOV,
          responseType: 'create_TimesheetEntryMethodLOV',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostTimesheetEntryMethodLOV',
  ],
        });
      }else if ($variables.showFields && $variables.Eqtype === 'UnitsOfMeasure') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_UnitsOfMeasure',
          body: $variables.PostUnitsOfMeasure,
          responseType: 'create_UnitsOfMeasure',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }
      }else if ($variables.showFields && $variables.Eqtype === 'UOM') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_Uom',
          body: $variables.PostUom,
          responseType: 'create_Uom',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostUom',
  ],
        });
      }else if($variables.showFields && $variables.Eqtype === 'Inspection Type'){
        const response2 = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_InspectionType',
          body: $variables.inspectionType,
          responseType: 'create_InspectionType',
        });

        if (response2.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.inspectionType',
  ],
        });
        
      }else if($variables.showFields && $variables.Eqtype === 'Overall Equipment Condition'){
        const response3 = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_EquipmentCondition',
          body: $variables.equipmentcondition,
          responseType: 'create_EquipmentCondition',
        });

        if (response3.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.equipmentcondition',
  ],
        });
        
      }

    }
  }

  return Save;
});
