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

  class ButtonActionChain13 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      
 $variables.gettemplatevariable_copy.template_id
        = $page.variables.gettemplateadp
.data.length === 0 ? 1
          : Math.max(...$page.variables.gettemplateadp
.data.map(obj => obj.template_id)) + 1;




      await Actions.fireDataProviderEvent(context, {
        target: $variables.gettemplateadp
,
        add: {
          data: $variables.gettemplatevariable_copy,
          keys: $variables.gettemplatevariable_copy.template_id,
        },
      });

    }
  }

  return ButtonActionChain13;
});
