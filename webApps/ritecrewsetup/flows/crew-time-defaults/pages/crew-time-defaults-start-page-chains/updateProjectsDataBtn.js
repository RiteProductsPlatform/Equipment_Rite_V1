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

  class updateProjectsDataBtn extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $application.functions.validateGroup('projectvalidgroup');

      if (callFunctionResult === 'valid') {
        $page.variables.updateProjects.ot_allowed = $page.variables.updateProjects.ot_allowed === true ? true : false;
        $page.variables.updateProjects.active_flag = $page.variables.updateProjects.active_flag === true ? true : false;
        const callRestTimeRiteOrdsServicePutUpdateProjectDetailsResult = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putUpdateProjectDetails',
          body: $page.variables.updateProjects,
        });

        if (callRestTimeRiteOrdsServicePutUpdateProjectDetailsResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Projects Data Updated Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

          const callComponentMethodEditProjectDetailsCloseResult = await Actions.callComponentMethod(context, {
            selector: '#editProjectDetails',
            method: 'close',
          });

          await Actions.callChain(context, {
            id: 'TR_FetchprojectsAction',
          });
        }
      }

    }
  }

  return updateProjectsDataBtn;
});
