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

  class addTocartSubstuteParentbuttonClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const cartAddition = await $functions.cartAddition($variables.selectedRow, JSON.stringify($variables.CartArray));

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

  return addTocartSubstuteParentbuttonClickChain;
});
