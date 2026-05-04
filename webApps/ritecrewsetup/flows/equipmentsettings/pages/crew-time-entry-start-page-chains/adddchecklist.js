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

  class adddchecklist extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      $variables.postchecklistcopy.check_list_id = $page.variables.eqpchecklistSaveADP.data.length === 0 ? 1
        : Math.max(...$page.variables.eqpchecklistSaveADP.data.map(obj => obj.check_list_id)) + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.eqpchecklistSaveADP,
        add: {
          data: $variables.postchecklistcopy,
          keys: $variables.postchecklistcopy.check_list_id,
        },
      });
    }
  }

  return adddchecklist;
});
