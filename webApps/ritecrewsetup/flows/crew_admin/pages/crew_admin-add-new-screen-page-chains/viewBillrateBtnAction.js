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

  class viewBillrateBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const ratescheduleOpen = await Actions.callComponentMethod(context, {
        selector: '#rateschedule',
        method: 'open',
      });

      const scheduleZGenerator = await $functions.scheduleZGenerator(JSON.stringify($variables.RatesData));

      $variables.ratesObj = scheduleZGenerator;
    }
  }

  return viewBillrateBtnAction;
});
