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

  class searchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_MaterialSearch',
        uriParams: {
          'p_project_id': $variables.headerobj.project_id?$variables.headerobj.project_id:"",
        },
      });

      $variables.FTOADP.data = response.body.items;
    }
  }

  return searchButtonActionChain;
});
