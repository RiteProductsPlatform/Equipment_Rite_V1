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

      $variables.equpvariables.file_name = files[0].name;
      $variables.equpvariables.file_type= files[0].type;

      const convertBase64 = await $functions.convertBase64(files[0]);
      $variables.equpvariables.file_content =convertBase64.data;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentnewADP,
        update: {
          data: $variables.equpvariables,
          indexes: index,
        },
      });

    }
  }

  return FilePickerSelectChain;
});
