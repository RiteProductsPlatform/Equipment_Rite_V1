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
      const { $page, $flow, $application, $functions, $variables } = context;
      const result = await $functions.convertfileintoKb(files[0]);

      if (result<7) {
        

        if (files.length > 0) {
          const file = files[0];
          try {
            const response = await $functions.processFile(file);
            const fileData = {
              fileName: response.fileName,
              fileType: response.fileType,
              fileContent: response.fileContent
            };

            $variables.fileObj.filename = response.fileName;
            $variables.fileObj.filetype = response.fileType;
            $variables.fileObj.filecontent = response.fileContent;



            return fileData;
          }
          catch (error) {
            console.error('Error processing file:', error);
          }
          // const processFile = await $functions.processFile(files);
        }
        else {
          console.log("No files selected");
        }
      }
else{
        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.fileObj',
  ],
        });

        await Actions.fireNotificationEvent(context, {
          displayMode: 'transient',
          type: 'error',
          summary: 'Please ensure the selected image size does not exceed 7 KB',
        });
  
}

    }
  }

  return FilePickerSelectChain;
});
