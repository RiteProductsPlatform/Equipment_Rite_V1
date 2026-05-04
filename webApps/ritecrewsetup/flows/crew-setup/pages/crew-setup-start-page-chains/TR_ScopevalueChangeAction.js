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

  class TR_ScopevalueChangeAction extends ActionChain {


    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      if (data.scope) {
        $page.variables.requiredObj.customer = data.scope === 'CUSTOMER' ? true : false;
        $page.variables.requiredObj.project = data.scope === 'PROJECT' ? true : false;
        $page.variables.requiredObj.contract = data.scope === 'CONTRACT' ? true : false;
      }
    }
  }

  return TR_ScopevalueChangeAction;
});
