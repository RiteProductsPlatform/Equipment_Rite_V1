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

  class BooleanCheckboxComponentClickChain3 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.activeFlag === 'undefined' || $page.variables.activeFlag === 'No') {
        $page.variables.activeFlag = 'Yes';
      }

      if ($page.variables.activeFlag === 'Yes') {
        $page.variables.activeFlag = 'No';
      }
    }
  }

  return BooleanCheckboxComponentClickChain3;
});
