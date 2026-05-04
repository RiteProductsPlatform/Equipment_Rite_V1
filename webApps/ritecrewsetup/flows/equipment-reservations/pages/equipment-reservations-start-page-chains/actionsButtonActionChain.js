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

  class actionsButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      
      $variables.mindate = await $functions.formatDate();


      $variables.selecedAcceptance = current.row;
      $variables.hdrId = current.row.crewsetup_eqp_header_id;
      const actionsPopupOpen = await Actions.callComponentMethod(context, {
        selector: '#ActionsPopup',
        method: 'open',
      });
    }
  }

  return actionsButtonActionChain;
});
