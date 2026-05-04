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

  class CreatePoBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

     const payload =  await $functions.payloadGenerator(JSON.stringify($variables.CreatePoObj));

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/PostPurchaseRequisitions',
        body: payload,
      });

      if (!response.ok) {
      
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Create Requisition',
          displayMode: 'transient',
        });

        return;
      } else {

         await Actions.fireNotificationEvent(context, {
           summary: 'Requisition Created Successfully',
           displayMode: 'transient',
           type: 'confirmation',
         });
        const poDlgClose = await Actions.callComponentMethod(context, {
          selector: '#poDlg',
          method: 'close',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.CreatePoObj',
  ],
        });
      }
    }
  }

  return CreatePoBtnAction;
});
