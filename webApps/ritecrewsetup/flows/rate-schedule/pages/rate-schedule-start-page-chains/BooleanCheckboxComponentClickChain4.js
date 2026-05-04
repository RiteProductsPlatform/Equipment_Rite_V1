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

  class BooleanCheckboxComponentClickChain4 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      if ($page.variables.defautFlag === undefined ||$page.variables.defautFlag === 'No') {
        $page.variables.defautFlag = 'Yes';
      }

      if ($page.variables.defautFlag === 'Yes') {
        $page.variables.defautFlag = 'No';
      }
    }
  }

  return BooleanCheckboxComponentClickChain4;
});
