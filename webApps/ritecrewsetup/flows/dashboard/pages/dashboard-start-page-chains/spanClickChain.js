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

  class spanClickChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toCrewAdmin = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'crew_admin',
      });
    }
  }

  return spanClickChain;
});
