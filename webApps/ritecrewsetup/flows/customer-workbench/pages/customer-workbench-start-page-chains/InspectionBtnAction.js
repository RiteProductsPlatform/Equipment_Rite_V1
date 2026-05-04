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

  class InspectionBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const toEquipInspection = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'equip-inspection',
        page: 'equip-inspection-start',
        history: 'push',
        params: {
          selectedrow: $variables.currentRow.rowData,
        },
      });

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return InspectionBtnAction;
});
