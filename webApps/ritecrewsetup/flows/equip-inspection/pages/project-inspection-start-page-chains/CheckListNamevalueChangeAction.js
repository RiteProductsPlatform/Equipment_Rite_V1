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

  class CheckListNamevalueChangeAction4 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     * @param {string} params.current 
     */
    async run(context, { key, data, metadata, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
    const row=  await $functions.addInspection(current, data.data);

        await Actions.fireDataProviderEvent(context, {
          target: $variables.inspection_adp,
          update: {
            data: row,
          },
        });
      // }
    }
  }

  return CheckListNamevalueChangeAction4;
});
