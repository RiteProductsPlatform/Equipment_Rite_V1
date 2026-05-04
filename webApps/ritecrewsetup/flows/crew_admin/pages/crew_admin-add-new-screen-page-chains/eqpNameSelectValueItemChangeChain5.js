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

  class eqpNameSelectValueItemChangeChain5 extends ActionChain {

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
  


      $variables.eqpPairing.default_location = data.default_location;
      $variables.eqpPairing.equipment_name = data.equipment_name;
      $variables.eqpPairing.equipment_number = data.equipment_number;
      $variables.eqpPairing.equipment_type = data.equipment_type;
      $variables.eqpPairing.lkpid = data.lkpid;
      $variables.eqpPairing.lkpvalue = data.lkpvalue;
    }
  }

  return eqpNameSelectValueItemChangeChain5;
});
