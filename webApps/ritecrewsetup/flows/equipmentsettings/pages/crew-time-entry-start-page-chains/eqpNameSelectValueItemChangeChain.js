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

  class eqpNameSelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // $variables.templateAdp.data[index].p_equipment_id = data.lkpid;
      // $variables.templateAdp.data[index].p_equipment_number = data.equipment_number;
      $variables.templatepopup.p_equipment_id = data.lkpid;
       $variables.templatepopup.p_equipment_number = data.equipment_number;
        $variables.templatepopup.p_equipment_name = data.equipment_name;


      // debugger;
    }

  }

  return eqpNameSelectValueItemChangeChain;
});
