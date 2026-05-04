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

  class checklist_Delete extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.eqpchecklistSaveADP,
        remove: {
          data: $variables.deleteChecklist_obj.data,
          indexes: $variables.deleteChecklist_obj.index,
          keys: $variables.deleteChecklist_obj.key,
        },
      });

      const equipCheckPopupClose = await Actions.callComponentMethod(context, {
        selector: '#equipCheck_popup',
        method: 'close',
      });
    }
  }

  return checklist_Delete;
});
