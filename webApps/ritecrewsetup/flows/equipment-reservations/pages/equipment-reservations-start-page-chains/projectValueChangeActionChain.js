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

  class projectValueChangeActionChain extends ActionChain {

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

      $variables.draftobj.projectId = data.projectId;
      $variables.draftobj.businessUnitName = data.businessUnitName;
      $variables.draftobj.orgId = data.orgId;
      $variables.draftobj.enabledFlag = data.enabledFlag;
      $variables.draftobj.completionDate = data.completionDate;
      $variables.draftobj.projectstartDate = data.startDate;
      $variables.draftobj.projectStatusCode = data.projectStatusCode;
      $variables.draftobj.projectTypeId = data.projectTypeId;
      $variables.draftobj.projectname = data.projectName;
      $variables.draftobj.projectnumber = data.number;

    }
  }

  return projectValueChangeActionChain;
});
