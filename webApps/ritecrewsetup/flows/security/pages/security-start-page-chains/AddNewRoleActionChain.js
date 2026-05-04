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

  class AddNewRoleActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

     $variables.editRoleVariables_copy.id = $variables.RolesTableADP.data.length==0?1:$variables.RolesTableADP.data.length + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.RolesTableADP,
        add: {
          data: $variables.editRoleVariables_copy,
          keys: $variables.editRoleVariables_copy.id,
        },
      });
    }
  }

  return AddNewRoleActionChain;
});
