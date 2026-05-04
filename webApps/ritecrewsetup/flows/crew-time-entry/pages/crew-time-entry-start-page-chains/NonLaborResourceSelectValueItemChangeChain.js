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

  class NonLaborResourceSelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;
// debugger;
      $variables.projectBasedRowData.non_labor_resource_org = data.non_labor_resource_org || "";
      $variables.projectBasedRowData.expenditure_type_name = data.expenditure_type_name || "";
      $variables.projectBasedRowData.expenditure_type_id = data.expenditure_type_id || "";
      $variables.projectBasedRowData.expenditure_org_name = data.expenditure_org_name || "";

    }
  }

  return NonLaborResourceSelectValueItemChangeChain;
});
