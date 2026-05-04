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

  class SwitchValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {boolean} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     */
    async run(context, { event, previousValue, value, updatedFrom }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if(value){
        if(value===true){
        $variables.AssetsTabObj.surplus_status = 'Y';
        }
        else{
            $variables.AssetsTabObj.surplus_status = 'N';
        }
      }
    }
  }

  return SwitchValueChangeChain;
});
