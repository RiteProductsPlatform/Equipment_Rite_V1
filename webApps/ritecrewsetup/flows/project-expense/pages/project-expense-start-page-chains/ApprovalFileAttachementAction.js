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

  class ApprovalFileAttachementAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { files, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/ApprovalfileAttachement',
        uriParams: {
          'p_file_type': files[0].type,
          'p_file_name': files[0].name,
          'p_file_content': files[0],
          'p_equipment_request_id': current.row.equipment_request_id,
        },
        body: files[0],
        contentType: 'application/octet-stream',
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Attachement Added Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Add Attachement',
          displayMode: 'transient',
        });
      }
    }
  }

  return ApprovalFileAttachementAction;
});
