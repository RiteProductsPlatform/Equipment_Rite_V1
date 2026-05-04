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

  class deletebuttonActionchain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.Eqtype === "Overall Equipment Condition") {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/delete_EquipmentCondition',
          uriParams: {
            'EquipmentCondition_Id': $variables.selectedrow.index,
          },
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Record Deleted',
            type: 'confirmation',
            displayMode: 'transient',
          });

          await Actions.fireDataProviderEvent(context, {
            refresh: null,
            target: $variables.equipmentConditionListSDP,
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to delete record',
            type: 'error',
            displayMode: 'transient',
          });

        }

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.selectedrow',
          ],
        });

      }
      else if ($variables.Eqtype === "Inspection Type") {
        const result = await Actions.callRest(context, {
          endpoint: 'businessObjects/delete_InspectionType',
          uriParams: {
            'InspectionType_Id': $variables.selectedrow.index,
          },
        });

        if (result.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Record Deleted',
            type: 'confirmation',
            displayMode: 'transient',
          });
          await Actions.fireDataProviderEvent(context, {
            refresh: null,
            target: $variables.inspectionTypeListSDP,
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to delete record',
            type: 'error',
            displayMode: 'transient',
          });

        }

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.selectedrow',
          ],
        });

      }
      else if ($variables.Eqtype === "UOM"){
        const response2 = await Actions.callRest(context, {
          endpoint: 'businessObjects/delete_Uom',
          uriParams: {
            'Uom_Id': $variables.selectedrow.index,
          },
        });

        if (response2.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Record Deleted',
            displayMode: 'transient',
            type: 'confirmation',
          });

          await Actions.fireDataProviderEvent(context, {
            target: $variables.uomListSDP,
            refresh: null,
          });
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to delete record',
            displayMode: 'transient',
            type: 'error',
          });
          
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.selectedrow',
  ],
        });


        

      }else if($variables.Eqtype === "Timesheet Entry Method LOV"){
        const response3 = await Actions.callRest(context, {
          endpoint: 'businessObjects/delete_TimesheetEntryMethodLOV',
          uriParams: {
            'TimesheetEntryMethodLOV_Id': $variables.selectedrow.index,
          },
        });

        if (response3.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Record Deleted',
            displayMode: 'transient',
            type: 'confirmation',
          });

          await Actions.fireDataProviderEvent(context, {
            refresh: null,
            target: $variables.timesheetEntryMethodLOVListSDP,
          });
        }
       else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to delete record',
            displayMode: 'transient',
            type: 'error',
          });

       }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.selectedrow',
  ],
        });
      }
      else if($variables.Eqtype === "Status"){

      }
      }


  }

  return deletebuttonActionchain;
});

