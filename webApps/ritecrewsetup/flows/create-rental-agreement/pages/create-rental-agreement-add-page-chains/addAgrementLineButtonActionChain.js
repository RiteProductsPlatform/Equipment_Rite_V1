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

  class addAgrementLineButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.lineObj',
    '$variables.tasksAdp.data',
  ],
      });
      $variables.iscreate = true;
      const popOpen = await Actions.callComponentMethod(context, {
        selector: '#pop',
        method: 'open',
      });

      $variables.lineObj.valid_from = $variables.headerObj.StartDate;
       $variables.lineObj.valid_to = $variables.headerObj.EndDate;
    }
  }

  return addAgrementLineButtonActionChain;
});
