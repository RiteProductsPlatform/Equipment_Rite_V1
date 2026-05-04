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

  class BadgeClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.Current 
     * @param {string} params.currendIndex 
     */
    async run(context, { Current, currendIndex }) {
      const { $page, $flow, $application } = context;

      if ($page.variables.selectedbadge) {

        await $page.functions.decolorselectedBadge($page.variables.selectedbadge);
      }

      $page.variables.resourceobj.resource = Current.resource;
      $page.variables.resourceobj.date = Current.input_date;
      $page.variables.resourceobj.id = Current.resource_id;
      $page.variables.resourceobj.crewName = Current.crewName;
      $page.variables.selectedbadge = Current.myid;
      $page.variables.resourceobj.fulldate = Current.setDate;

      await $page.functions.colorselectedBadge($page.variables.selectedbadge, Current.engaged);

      const callRestTimeRiteOrdsServiceFetchScheduleDetailsResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/FetchScheduleDetails',
        uriParams: {
          'crewsetup_id': $page.variables.selectedCrewId,
          'input_date': Current.input_date,
          'resource_id': Current.resource_id,
        },
      });

      if (callRestTimeRiteOrdsServiceFetchScheduleDetailsResult.ok) {
        if(callRestTimeRiteOrdsServiceFetchScheduleDetailsResult.body.items.length > 0){
          $page.variables.DetailsTableADP.data = callRestTimeRiteOrdsServiceFetchScheduleDetailsResult.body.items;
          $page.variables.Assign = false;
          
        } else {
          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.DetailsTableADP.data',
            ],
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'No Schedule Details Found',
            displayMode: 'transient',
            type: 'info',
          });

          $page.variables.Assign = true;
        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Fetch Schedule Details',
          displayMode: 'transient',
        });
      }
    }
  }

  return BadgeClickChain;
});
