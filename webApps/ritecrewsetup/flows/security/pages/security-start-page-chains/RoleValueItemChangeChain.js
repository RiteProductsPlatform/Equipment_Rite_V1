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

  class RoleValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, data, metadata, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.editRoleVariables.rolecode = data.rolename;
      $variables.editRoleVariables.roleId = data.roleId;

      await Actions.fireDataProviderEvent(context, {
        update: {
          data: $variables.editRoleVariables,
          indexes: index,
        },
        target: $variables.editTableADP,
      });
    }
  }

  return RoleValueItemChangeChain;
});
