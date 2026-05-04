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

  class eqpSusbstuteAddToCartbuttonClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.current
     */
    async run(context, { event, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let cartAddition = await $functions.cartAddition(current, JSON.stringify($variables.CartArray));

      if (cartAddition) {
        $variables.CartArray = cartAddition;
      }
        await Actions.fireNotificationEvent(context, {
        summary: 'Your selected equipment has been added to the cart successfully',
        type: 'confirmation',
        displayMode: 'transient',
      });
    }
  }

  return eqpSusbstuteAddToCartbuttonClickChain;
});
