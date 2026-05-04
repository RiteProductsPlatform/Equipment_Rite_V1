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

  class fileuploadselectionListener extends ActionChain {

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

      const fileToBase64 = await $functions.fileToBase64(files[0]);

      $variables.rowData = current.row;
      $variables.rowData.file_name = files[0].name;
      $variables.rowData.file_type = files[0].type;
      $variables.rowData.file_content = fileToBase64;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.inspection_adp,
        update: {
          data: $variables.rowData,
          keys: [key],
        },
      });
    }
  }

  return fileuploadselectionListener;
});
