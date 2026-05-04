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

  class customersiteValueChangeAction extends ActionChain {


    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.selectedRowRequest.customer_site_id = data.AddressId;
      $variables.selectedRowRequest.customer_site = data.PartySiteName;
    }
  }

  return customersiteValueChangeAction;
});
