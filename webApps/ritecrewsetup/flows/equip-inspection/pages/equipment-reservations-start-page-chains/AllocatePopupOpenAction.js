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

  class AllocatePopupOpenAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const equipmentOverrideDlgOpen = await Actions.callComponentMethod(context, {
        selector: '#EquipmentOverrideDlg',
        method: 'open',
      });
    }
  }

  return AllocatePopupOpenAction;
});
