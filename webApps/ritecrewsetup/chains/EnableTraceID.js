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

  class EnableTraceID extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value
     * @param {any} params.event
     * @param {any} params.previousValue
     * @param {any} params.updatedFrom
     */
    async run(context, { value, event, previousValue, updatedFrom }) {
      const { $application, $constants, $variables } = context;
       try {
 
    if (value === true) {
 
      if ($application.variables.traceIdDisplay) {
        $application.variables.enableTrace = true;
        return;
      }
 
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQUIP_ORCL_REST_API',
      });
 
      if (!response.ok) {
        throw response;
      }
 
      $application.variables.enableTrace = true;
      $application.variables.traceIdDisplay = response.body.trace_id;
 
    } else {
 
      $application.variables.enableTrace = false;
      $application.variables.traceIdDisplay = "";
 
    }
 
  } catch (error) {
 
    console.error('Toggle API failed:', error);
 
   
    $application.variables.enableTrace = false;
 
  }
}
  }
    

  return EnableTraceID;
});
