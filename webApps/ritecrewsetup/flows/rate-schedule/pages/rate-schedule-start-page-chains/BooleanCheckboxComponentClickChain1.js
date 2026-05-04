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

  class BooleanCheckboxComponentClickChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.location_based_differential === undefined ||$page.variables.location_based_differential === 'No') {
        $page.variables.location_based_differential = 'Yes';
      }

      if ($page.variables.location_based_differential === 'Yes') {
        $page.variables.location_based_differential = 'No';
      }
    }
  }

  return BooleanCheckboxComponentClickChain1;
});
