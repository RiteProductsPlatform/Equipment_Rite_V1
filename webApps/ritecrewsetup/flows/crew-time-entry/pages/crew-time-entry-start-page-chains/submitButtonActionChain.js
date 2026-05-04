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

  class submitButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const checkStatuses = await $functions.checkStatuses($variables.FilteredData);

      if (checkStatuses) {
        const areDatesWithinWeek = await $functions.areDatesWithinWeek($variables.FilteredData, $variables.searchobj.dateRange1);
      //  debugger;
        if (areDatesWithinWeek) {

          const validateNonLaborResource = await $functions.validateNonLaborResource($variables.FilteredData);

          if (validateNonLaborResource) {

            await Actions.callChain(context, {
              chain: 'TR_SubmitBtnAction_JS',
            });

            await Actions.resetVariables(context, {
              variables: [
    '$variables.projectBasedTimesheetADP.data',
  ],
            });

            await Actions.callChain(context, {
              chain: 'SearchButtonAction_New',
            });
          }else{
            await Actions.fireNotificationEvent(context, {
              summary: 'Please ensure that all selected records contain valid Non Labor Resource details before proceeding.',
              type: 'error',
              displayMode: 'transient',
            });
            
          }
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Timesheet submission is required between the requested start and end dates.',
            type: 'error',
            displayMode: 'transient',
          });

        }

        
        
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'The selected records have already been submitted or approved',
          type: 'error',
          displayMode: 'transient',
        });

      }
    }
  }

  return submitButtonActionChain;
});
