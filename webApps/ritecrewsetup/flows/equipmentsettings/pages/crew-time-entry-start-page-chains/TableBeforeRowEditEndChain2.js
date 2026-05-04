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

  class TableBeforeRowEditEndChain2 extends ActionChain {

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
     * @param {object} params.record
     */
    async run(context, { event, accept, setUpdatedItem, rowContext, cancelEdit, rowKey, rowIndex, rowData, record }) {
      const { $page, $flow, $application, $constants, $variables } = context;
// debugger;
      await Actions.fireDataProviderEvent(context, {
        target: $variables.eqpSettingsAdp,
        update: {
          data: $variables.eqpSettingObj,
          keys: [rowKey],
        },
      });
    }
  }

  return TableBeforeRowEditEndChain2;
});
