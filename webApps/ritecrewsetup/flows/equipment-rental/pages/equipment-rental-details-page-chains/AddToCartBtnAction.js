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

  class AddToCartBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.Current 
     */
    async run(context, { Current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const cartAddition = await $functions.cartAddition(JSON.stringify(Current), JSON.stringify($variables.CartArray));

      $flow.variables.syncCartArray = cartAddition;
      $variables.CartArray = cartAddition;

      // ---- TODO: Add your code here ---- //
      
      console.log($variables.CartArray);
    }
  }

  return AddToCartBtnAction;
});
