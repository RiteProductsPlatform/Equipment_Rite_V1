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

  class DefaultContractsUpdateButton extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callFunctionResult = await $application.functions.validateGroup('contractsValidgroup');

      if (callFunctionResult === 'valid') {

        $page.variables.defaultContracts.ot_allowed = $page.variables.defaultContracts.ot_allowed === true ? true : false;
        $page.variables.defaultContracts.active_flag = $page.variables.defaultContracts.active_flag === true ? true : false;
        const callRestTimeRiteOrdsServicePutUpdateContractDetailsResult = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putUpdateContractDetails',
          body: $page.variables.defaultContracts,
        });

        if (callRestTimeRiteOrdsServicePutUpdateContractDetailsResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Default Contracts Updated Successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });

          const callComponentMethodEditContractDetailsCloseResult = await Actions.callComponentMethod(context, {
            selector: '#editContractDetails',
            method: 'close',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.contractsADP',
            ],
          });

          await Actions.callChain(context, {
            chain: 'TR_customerSearchLOvbtn',
          });
        }
      }
    }
  }

  return DefaultContractsUpdateButton;
});
