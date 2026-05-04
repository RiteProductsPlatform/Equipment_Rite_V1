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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;




      // const response = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/getEQPRite_DashboardCount',
      // });

      // $variables.dashboardAdp.data = response.body.items;
      
      //  await $application.functions.getUsernameFromJwt($application.variables.jwt);

      // const response1 = await Actions.callRest(context, {
      //   endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_USERS_JOB_ROLES1_0UsersJobRoles',
      //   uriParams: {
      //     'p_username': $application.user.username,
      //   },
      // });
      //       const navigationContent = await $application.functions.getNavigationContent(response1.body.items);
      //       $application.variables.restrictednavTree =navigationContent ;
    }
  }

  return PageVbEnterChain;
});
