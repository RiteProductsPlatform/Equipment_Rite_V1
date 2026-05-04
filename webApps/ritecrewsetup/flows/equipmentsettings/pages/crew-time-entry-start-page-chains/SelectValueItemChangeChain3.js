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

  class SelectValueItemChangeChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, data, metadata, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.postchecklist.equipment_name = data.equipment_name;
    }
  }

  return SelectValueItemChangeChain3;
});
