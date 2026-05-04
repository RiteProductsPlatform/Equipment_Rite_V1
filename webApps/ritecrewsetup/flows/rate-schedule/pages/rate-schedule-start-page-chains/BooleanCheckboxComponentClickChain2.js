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

  class BooleanCheckboxComponentClickChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables } = context;

      if ($page.variables.hoursTypeRateDiff ===undefined || $page.variables.hoursTypeRateDiff === 'No') {
        $page.variables.hoursTypeRateDiff = 'Yes';
      }

      if ($variables.hoursTypeRateDiff === 'Yes') {
        $page.variables.hoursTypeRateDiff = 'No';
      }
    }
  }

  return BooleanCheckboxComponentClickChain2;
});
