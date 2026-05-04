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

  class TR_SubmitbtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $application.functions.validateGroup('defaultvalidation');

      if (callFunctionResult === 'valid') {
        $page.variables.custDetailsObj.ot_allowed = $page.variables.custDetailsObj.ot_allowed === true ? true : false;
        $page.variables.custDetailsObj.time_card_apr_req_flag = $page.variables.custDetailsObj.time_card_apr_req_flag === true ? true : false;
        $page.variables.custDetailsObj.timecard_collation = $page.variables.custDetailsObj.timecard_collation === true ? true : false;
        $page.variables.custDetailsObj.timecard_balancing = $page.variables.custDetailsObj.timecard_balancing === true ? true : false;
        $page.variables.custDetailsObj.active_flag = $page.variables.custDetailsObj.active_flag === true ? true : false;
        $page.variables.custDetailsObj.client_ers_enabled = $page.variables.custDetailsObj.client_ers_enabled === true ? true : false;


        const callRestTimeRiteOrdsServicePutUpdateCustomerDetailsResult = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putUpdateCustomerDetails',
          body: $page.variables.custDetailsObj,
        });

        if (callRestTimeRiteOrdsServicePutUpdateCustomerDetailsResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Customers Data Updated Succesfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

          const callRestTimeRiteOrdsServiceDefaultCustomerDataUpdateResult = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/DefaultCustomerDataUpdate',
            uriParams: {
              'customer_number': $page.variables.custDetailsObj.customer_number,
            },
          });

          if (callRestTimeRiteOrdsServiceDefaultCustomerDataUpdateResult.ok) {
            await Actions.resetVariables(context, {
              variables: [
                '$page.variables.custDetailsObj',
              ],
            });

            await Actions.callChain(context, {
              chain: 'TR_customerSearchLOvbtn',
            });

            const callComponentMethodProjectDetailsRefreshResult = await Actions.callComponentMethod(context, {
              selector: '#project_details',
              method: 'refresh',
            });
          }
        }
      }

    }
  }

  return TR_SubmitbtnAction;
});
