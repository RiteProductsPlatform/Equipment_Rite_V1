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

  class generateToken extends ActionChain {


    async run(context) {
      const { $application, $constants, $variables, $functions } = context;

      const response1 = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_USERS_JOB_ROLES1_0UsersJobRoles',
        uriParams: {
          //'p_username': $application.user.username,
          'p_username': 'EQUIPMENT.ADMINISTRATOR',
        },
      });

//         const rolesdata = [
//   {
//     role_id: "300000006507108",
//     role_name: "equipment administrator",
//     role_common_name: "OII_RT_EQP_ADMINISTRATOR_JR",
//     name: "dneredu@oceaneering.com",
//     userjobroles_pk: "dneredu@oceaneering.com_OII_RT_EQP_ADMINISTRATOR_JR"
//   }
// ];

// let rolesData=response1.body.items;
      
      // debugger;
      if(response1.ok){
      const navigationContent = await $application.functions.getNavigationContent(response1.body.items);
      $application.variables.restrictednavTree = navigationContent;

      const response13 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_DashboardCount',
      });

      $variables.dashboardAdp.data = response13.body.items;



        await Actions.resetVariables(context, {
        variables: [
    '$application.variables.NavTree',
  ],
      });

      const navigationContent1 = await $functions.getNavigationContent($functions.getMetadata($variables.settingsEnabled,$variables.isrentalEnabled,$variables.isApproverEnabled,$application.variables.isTimeentryenabled,$application.variables.isequipmentManagerEnabled,$application.variables.isprojectmanagerenabled,$application.variables.isAnalyticsEnabled));

      $variables.NavTree = navigationContent1;
      }

      // await $application.functions.getUsernameFromJwt($application.variables.jwt);
      // debugger;



    }
  }

  return generateToken;
});
