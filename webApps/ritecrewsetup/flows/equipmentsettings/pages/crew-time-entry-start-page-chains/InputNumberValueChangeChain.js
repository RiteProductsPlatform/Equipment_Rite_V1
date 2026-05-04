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

  class InputNumberValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {number} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, previousValue, value, updatedFrom, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
     

    //   const util= $functions.getUtilization(value);
   

    //   $variables.templateAdp.data[index].p_utilization = util;

    //   await Actions.fireDataProviderEvent(context, {
    //     target: $variables.templateAdp,
    //     update: {
    //       data: $variables.templateAdp.data[index],
    //       indexes: [index],
    //     },
    //   });

      

    // let array =  $variables.templateAdp.data;
      // debugger;

      
      // $variables.templateAdp.data[index].p_equipment_id = data.lkpid;
      
// debugger;
      // await Actions.fireDataProviderEvent(context, {
      //   target: $variables.templateAdp,
      //   update: {
      //     data: $variables.templateAdp.data[$variables.rowIndex],
      //     indexes: $variables.rowIndex,
      //   },
      // });

        //  debugger;

// debugger;
//       await Actions.fireDataProviderEvent(context, {
//         target: $variables.templateAdp,
//         update: {
//           data: $variables.templatepopup,
//           indexes: $variables.rowIndex,
//         },
//       });
    }
  }

  return InputNumberValueChangeChain;
});
