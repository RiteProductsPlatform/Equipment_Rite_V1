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

  class SubmitBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */sxa
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const validateGroup = await $application.functions.validateGroup('requestvalgroup');

      if (validateGroup === 'valid') {
        $variables.selectedRow.equipment_number = null;
        $variables.selectedRow.equipment_id = null;
           $variables.selectedRow.requestor_name = $application.variables.user;
        $page.variables.fileObj.file_attachment = $page.variables.fileObj.file_content ? 'Yes' : 'No';
        let payloadObj = { ...$page.variables.selectedRow, ...$page.variables.fileObj };

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEqpRequestPage',
          body: payloadObj,
        });

        if (!response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error Submitting Request',
            message: response.statusTextresponse.statusText,
            displayMode: 'transient',
          });

          return;
        }

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.RequstProjectSDP',
            '$page.variables.get1113185ProjectsProjectIdChildTasks2ListSDP',
            '$page.variables.selectedRow',
            '$page.variables.getGetCrewNameLOVListSDP'
          ]
        });

        const ojDialog12393698201Close = await Actions.callComponentMethod(context, {
          selector: '#oj-dialog--1239369820-1',
          method: 'close'
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Request Submitted',
          message: "Equipment Request: " + response.body.eqp_request_number + " is submitted successfully ",
          type: 'confirmation',
        });

      }
    }
  }

  return SubmitBtnAction;
});
