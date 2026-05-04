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

  class InputDateValueChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callFunction = await this.manageDateFormat(context, { arg1: value });

      $variables.endDate = callFunction;
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.arg1 
     * @return {string} 
     */

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.arg1 
     * @return {string} 
     */
    async manageDateFormat(context, { arg1 }) {
      const { $page, $flow, $application, $constants, $variables } = context;
    let dateObj = new Date(arg1);

// Define month names array
let monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Extract day, month, and year
let day = dateObj.getDate();
let month = monthNames[dateObj.getMonth()];
let year = dateObj.getFullYear().toString().slice(-2);

// Format date string
let formattedDate = `${day < 10 ? '0' + day : day}-${month}-${year}`;
return formattedDate;
    }
  }

  return InputDateValueChangeChain1;
});
