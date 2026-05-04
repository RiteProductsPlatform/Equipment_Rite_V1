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

  class viewTemplatesButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_TemplateHeaderDetails',
      });

      if (response.ok) {
        

        $variables.gettemplateadp.data = response.body.items;

        const templateOpen = await Actions.callComponentMethod(context, {
          selector: '#template',
          method: 'open',
        });
      }

      await Actions.resetVariables(context, {
        variables: [
    '$variables.checkboxupdate',
  ],
      });
    }
  }

  return viewTemplatesButtonActionChain;
});
