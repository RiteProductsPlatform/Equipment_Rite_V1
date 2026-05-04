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

  class SelectValueItemChangeChain8 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.selectedTrxSrcId = data.txnSourceId;
      $variables.selectedTrxSrcName = data.name;
      $variables.selecteddocumentname = data.document_name;
      $variables.selecteddocument_entry_name = data.document_entry_name;
    }
  }

  return SelectValueItemChangeChain8;
});
