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
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { files, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if (files.length > 0) {
        const processFile = await $functions.processFile(files[0]);

        const updateSelRows = await $functions.updateSelRows(processFile, current.row, $variables.SelectedRows);

        $variables.SelectedRows = updateSelRows;
      }
    }
  }

  return FilePickerSelectChain;
});
