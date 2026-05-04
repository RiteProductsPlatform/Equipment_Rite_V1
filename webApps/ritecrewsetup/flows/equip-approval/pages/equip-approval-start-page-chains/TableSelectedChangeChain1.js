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

  class TableSelectedChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.previousValue
     * @param {object} params.value
     * @param {string} params.updatedFrom
     * @param {any[]} params.keys
     * @param {any} params.selected
     */
    async run(context, { event, previousValue, value, updatedFrom, keys, selected }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;


      const checkfilterData = await $functions.checkfilterData(selected, $variables.DetailsTblADPNew.data, keys);
      $variables.eqpnums = checkfilterData;

      if ($variables.eqpnums.length > Number($variables.selectionrow.equip_req_quantity) === true) {
        // await Actions.fireNotificationEvent(context, {
        //   summary: "You Cant Select more than " + $variables.selectionrow.quantity + " Equipments",
        // });

        await Actions.fireNotificationEvent(context, {
          summary: "You Cant Select more than 1 Equipment",
        });
      } else {

      }


    }
  }

  return TableSelectedChangeChain1;
});
