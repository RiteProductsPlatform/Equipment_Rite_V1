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

  class equipmentSelectValueItemChangeChain2 extends ActionChain {

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
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if(data){
        $variables.lineObj.eqp_name = data.equipment_name;
        $variables.lineObj.eqp_id = data.lkpid;
        $variables.lineObj.eqp_number = data.equipment_number;
         $variables.lineObj.lot_number = data.mf_serial_number;
        
      }
    }
  }

  return equipmentSelectValueItemChangeChain2;
});
