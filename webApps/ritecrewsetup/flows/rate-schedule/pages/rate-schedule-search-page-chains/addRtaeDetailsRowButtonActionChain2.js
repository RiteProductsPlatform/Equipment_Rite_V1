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

  class addRtaeDetailsRowButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

         $variables.ScheduleDetailsRowDataObj_copy.uid = $page.variables.rateDeatilsAdp.data.length === 0 ? 1
        : Math.max(...$page.variables.rateDeatilsAdp.data.map(obj => obj.uid)) + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.rateDeatilsAdp,
        add: {
          data: $variables.ScheduleDetailsRowDataObj_copy,
        },
      });
    }
  }

  return addRtaeDetailsRowButtonActionChain2;
});
