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

  class HyperlinkClickChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const navigateToPageCrewAdminCoreResult = await Actions.navigateToPage(context, {
        page: 'crew_admin-core',
      });
    }
  }

  return HyperlinkClickChain;
});
