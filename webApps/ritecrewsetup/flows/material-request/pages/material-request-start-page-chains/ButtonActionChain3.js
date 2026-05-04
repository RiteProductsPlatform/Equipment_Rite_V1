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

  class ButtonActionChain3 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const results = await ActionUtils.forEach($variables.FTOdlgADP.data, async (item, index) => {
        debugger;
      }, { mode: 'serial' });
    }
  }

  return ButtonActionChain3;
});
