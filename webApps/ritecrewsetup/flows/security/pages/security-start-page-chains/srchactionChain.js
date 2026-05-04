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

  class srchactionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_SecuritySubmit',
        uriParams: {
          'p_user_name': $variables.headerobj.user,
        },
      });

      if (!response.ok) {
        await Actions.fireNotificationEvent(context, {
          displayMode: 'transient',
          type: 'error',
          summary: 'Failed to Fetch Roles ',
        });

        return;
      } else {
        $variables.RolesTableADP.data = response.body.items;
      }


    }
  }

  return srchactionChain;
});
