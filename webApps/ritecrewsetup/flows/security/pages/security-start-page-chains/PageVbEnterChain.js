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
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'getContractSummary/getEQUIPMENT_RITEEQPUSERROLEDETAILS1_0GetUserRolesDetails',
      });

      if (response.ok) {
         const uniqueUsers = await $functions.getUniqueValues(response.body.userNames);       
         $variables.usersADP.data = uniqueUsers;
       
      }

      const response2 = await Actions.callRest(context, {
        endpoint: 'getContractSummary/getEQUIPMENT_RITEEQPROLESDETAILS1_0GetRoleDetails',
      });

      if (response2.ok) {
        const roleNames = await $functions.getUniqueroleNames(response2.body.Roles);
        $variables.roleNameADP.data = roleNames;
      }
    }
  }

  return PageVbEnterChain;
});
