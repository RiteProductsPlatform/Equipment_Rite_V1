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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.openUrl(context, {
        url: `https://oic-vbcs-riteoicdev-vb-idjm2yj32zav.builder.us-ashburn-1.ocp.oraclecloud.com/ic/builder/rt/Material_Request/live/webApps/vbredwoodapp`,
        history: 'push',
        windowName: '_self',
      });
    }
  }

  return PageVbEnterChain;
});
