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

  class nameClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
       

      const toCrewAdminSearch = await Actions.navigateToPage(context, {
        page: 'crew_admin-search',
        params: {
          RowData:current.row,
          pagetype: 'Create',
        },
      });
    }
  }

  return nameClickAction;
});
