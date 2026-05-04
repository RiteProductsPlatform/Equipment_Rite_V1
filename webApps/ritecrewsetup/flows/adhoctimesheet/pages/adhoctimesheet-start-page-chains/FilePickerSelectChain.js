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

  class FilePickerSelectChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     */
    async run(context, { files }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const processFile = await $application.functions.processFile(files);

      const populateData = await $application.functions.populateData(processFile);

      $variables.ManualTimesheetADP.data = populateData;
    }
  }

  return FilePickerSelectChain;
});
