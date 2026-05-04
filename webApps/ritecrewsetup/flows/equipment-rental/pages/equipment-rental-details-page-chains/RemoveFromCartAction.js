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

  class RemoveFromCartAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.current 
     */
    async run(context, { current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const removefromCart = await $functions.removefromCart(JSON.stringify(current), JSON.stringify($variables.CartArray));
      const removefromFlowCart = await $functions.removefromCart(JSON.stringify(current), JSON.stringify($flow.variables.syncCartArray));
      
      $variables.CartArray = removefromCart;
      $flow.variables.syncCartArray = removefromFlowCart;
    }
  }

  return RemoveFromCartAction;
});
