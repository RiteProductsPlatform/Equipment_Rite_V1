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

  class TR_resourceValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      if (value) {

        const callRestTimeRiteOrdsServiceGetResourceMetedataResult = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getResourceMetedata',
          uriParams: {
            'resource_name': value,
          },
        });

        $page.variables.linesObj.resource_number = callRestTimeRiteOrdsServiceGetResourceMetedataResult.body.items[0].resource_number;
        $page.variables.linesObj.resource_role = callRestTimeRiteOrdsServiceGetResourceMetedataResult.body.items[0].resource_job;
        $page.variables.linesObj.resource_location = callRestTimeRiteOrdsServiceGetResourceMetedataResult.body.items[0].resource_location;
        $page.variables.linesObj.project_assigned = callRestTimeRiteOrdsServiceGetResourceMetedataResult.body.items[0].project_assigned;
              $page.variables.linesObj.resource_id = callRestTimeRiteOrdsServiceGetResourceMetedataResult.body.items[0].resource_id;

        if ($page.variables.linesObj.project_assigned === 'N') {
          $page.variables.resourceMessage[0] = {
    "detail": 'Selected Resource is not part of Project assigned resources',
    "summary": '',
    "severity": 'info',
  };
        }
      }
      else {


        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.linesObj.resource_number',
            '$page.variables.linesObj.resource_role',
            '$page.variables.linesObj.resource_location',
            '$page.variables.linesObj.project_assigned',
            ' $page.variables.linesObj.resource_id'
          ],
        });
      }

    }
  }

  return TR_resourceValueChangeAction;
});
