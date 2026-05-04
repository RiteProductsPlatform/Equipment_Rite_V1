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

  class createButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // if ($variables.isvalid==="valid") {

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.FTOdlgADP.data',
  ],
        });

        await Actions.fireDataProviderEvent(context, {
          target: $variables.FTOdlgADP,
          add: {
            data: $variables.ftoblankrowData,
          },
        });

        const ojDialog20779685781Open = await Actions.callComponentMethod(context, {
          selector: '#oj-dialog--2077968578-1',
          method: 'open',
        });
      // }
      // else{
      //   await Actions.fireNotificationEvent(context, {
      //     summary: 'Please Select Project Name',
      //     displayMode: 'transient',
      //     type: 'error',
      //   });
        
      // }
    }
  }

  return createButtonActionChain;
});
