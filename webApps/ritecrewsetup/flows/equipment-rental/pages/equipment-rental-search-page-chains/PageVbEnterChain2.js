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

  class PageVbEnterChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRent_EqupDetails',
        uriParams: {
          'p_equipment_name': $application.variables.eqpname,
        },
      });

      $variables.RowData = response.body.items[0];
    }
  }

  return PageVbEnterChain2;
});
