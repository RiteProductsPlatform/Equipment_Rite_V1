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

  class equipmentsubstituteTableBeforeRowEditEndChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.accept
     * @param {any} params.setUpdatedItem
     * @param {object} params.rowContext
     * @param {any} params.cancelEdit
     * @param {any} params.rowKey
     * @param {number} params.rowIndex
     * @param {any} params.rowData
     */
    async run(context, { event, accept, setUpdatedItem, rowContext, cancelEdit, rowKey, rowIndex, rowData }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentSubsituteAdp,
        update: {
          data: $variables.equipmentSubsitute,
          indexes: [
      rowIndex,
    ],
          keys: [rowKey],
        },
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.equipmentsubstitutekey',
  ],
      });
    }
  }

  return equipmentsubstituteTableBeforeRowEditEndChain;
});
