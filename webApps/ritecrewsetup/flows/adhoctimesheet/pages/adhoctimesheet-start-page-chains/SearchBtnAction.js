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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEupManualTimeSearch',
        uriParams: {
          'p_equipment_class': $variables.headerObj.eqpclass ?$variables.headerObj.eqpclass:'',
        },
      });

      if (response.body.items.length > 0) {

        const adpgenerator = await $functions.adpgenerator(JSON.stringify(response.body.items), $variables.headerObj, $application.user.email, JSON.stringify($variables.taskTblADP.data));

        const columnsGenerator = await $functions.columnsGenerator($variables.headerObj, JSON.stringify($variables.taskTblADP.data));

        $variables.ManualTimesheetADP.data = adpgenerator;
        $variables.columns = columnsGenerator;
      }
    }
  }

  return SearchBtnAction;
});
