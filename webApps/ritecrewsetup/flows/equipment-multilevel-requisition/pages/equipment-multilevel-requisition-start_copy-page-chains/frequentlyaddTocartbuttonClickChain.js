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

  class frequentlyaddTocartbuttonClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.current
     */
    async run(context, { event, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const cartAddition2 = await $functions.cartAddition($variables.selectedRow, JSON.stringify($variables.CartArray));

      $variables.CartArray = cartAddition2;

      const results = await ActionUtils.forEach($variables.eqpPairingAdp.data, async (item, index) => {

        let cartAddition = await $functions.cartAddition(item, JSON.stringify($variables.CartArray));

        if (cartAddition) {

          $variables.CartArray = cartAddition;
        }
      }, { mode: 'serial' });

      await Actions.fireNotificationEvent(context, {
        summary: 'Your selected equipment has been added to the cart successfully',
        type: 'confirmation',
        displayMode: 'transient',
      });
    }
  }

  return frequentlyaddTocartbuttonClickChain;
});
