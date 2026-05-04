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

  class ItemNumberValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.CreatePoObj.item_description = data.description;
      $variables.CreatePoObj.CurrencyCode = data.currency_code;
      $variables.CreatePoObj.uom = data.uom;
    }
  }

  return ItemNumberValueChangeAction;
});
