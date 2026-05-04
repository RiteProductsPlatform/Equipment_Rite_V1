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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if (files.length > 0) {
        try {
          const processFile = await $functions.processFile(files[0]);

          $variables.fileObj.file_name = processFile.fileName;
          $variables.fileObj.file_type = processFile.fileType;
          $variables.fileObj.file_content = processFile.fileContent;
        } catch (error) {
        }
      }
    }
  }

  return FilePickerSelectChain;
});
