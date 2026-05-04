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

  class CreateTemplateButtonActionChain6 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    // '$variables.templateadp.data',
    '$variables.templateAdp.data',
  ],
      });

      const validateGroup = await $application.functions.validateGroup('templateVlidation');

      if (validateGroup==="valid") {

        const ojDialog9731887931Open = await Actions.callComponentMethod(context, {
          selector: '#oj-dialog-973188793-1',
          method: 'open',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please complete all required fields',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return CreateTemplateButtonActionChain6;
});
