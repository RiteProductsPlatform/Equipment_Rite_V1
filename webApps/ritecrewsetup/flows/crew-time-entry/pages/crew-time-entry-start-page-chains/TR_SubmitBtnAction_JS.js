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

  class TR_SubmitBtnAction_JS extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
let storeApiName;

let errMsg;

let pageName = 'crew-time-entry';

      // 1. Loop through FilteredData (Equivalent to "forEachInFilteredData")
      // We use entries() to get both the data and the index for the payload generator
      for (const [index, currentData] of $variables.FilteredData.entries()) {
        
        // Action: callFunctionDateFormatter
        const dateResults = await $page.functions.dateFormatter(
          $variables.FilteredData[0].week_start_date,
          $variables.FilteredData[0].week_end_date,
          $variables.searchobj.crewdate
        );
      
        // Action: callFunctionPayloadGenerator
        const payload = await $page.functions.payloadGenerator(
          currentData,
          $application.user.email,
          dateResults.startDate,
          dateResults.endDate,
          $variables.searchobj.dateRange1,
          dateResults.crewDate,
          $variables.searchobj.specific,
          $variables.maxweekid
        );
      
        // Action: callRestPostEqpSubmitTimeEntry
        try {
      storeApiName = 'postEqpSubmitTimeEntry';
      
          const restResult = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEqpSubmitTimeEntry',
            body: payload,
            headers: {
        'R_PAGE_NAME': pageName,
        'R_TRACE_ID': $application.variables.traceIdDisplay || null,
        'R_USER_NAME': $application.user.username,
      },
          });
      
          if (!restResult.ok) {
       
      errMsg =
          restResult.body?.detail ||
          restResult.body?.message ||
          (typeof restResult.body === 'string' ? restResult.body : null) ||
          restResult.statusText ||
          'API Error';
       
        throw new Error(errMsg);
       
      }
      
          if (restResult.ok) {
            // Action: assignVariablesSuccessVar
            $variables.SuccessVar = ($variables.SuccessVar || 0) + 1;
          } else {
            // Action: callFunctionGetsysdate (on failure)
            await $page.functions.getsysdate();
          }
        } catch (error) {
          await $page.functions.getsysdate();
      
          let errMessage =
      
      error?.message ||
      
       error?.body?.detail ||
      
      error?.body?.message ||
      
      (typeof error?.body === 'string' ? error.body : null) ||
      
      JSON.stringify(error);
      
      const response = await Actions.callRest(context, {
      
      endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
      headers: {
      'R_PAGE_NAME': pageName,
      'R_TRACE_ID': $application.variables.traceIdDisplay || null,
      'R_USER_NAME': $application.user.username,
      },
      
      body: {
      
      'p_api_name': storeApiName,
      
      'p_debug_message':errMessage
      
       },
      
      });
      
      
      
      await Actions.fireNotificationEvent(context, {
      
      summary: 'ERROR',
      
      message: errMessage,
      
      displayMode: 'persist',
      
      type: 'error',
      
      });
          
        }
      }
      
      // 2. Post-Loop Logic
      // Action: assignVariablesIsAdd
      $variables.isAdd = false;
      $variables.IsApprove = true;

      // Action: resetVariablesUpdateTimeSheet
      // In JS, we reset by assigning the variable back to its default (usually null or empty)
      $variables.updateTimeSheet = null;

      // // Action: fireNotification
      // await Actions.fireNotification(context, {
      //   summary: 'Time Sheet submitted Successfully',
      //   displayMode: 'transient',
      //   type: 'confirmation',
      // });

      await Actions.fireNotificationEvent(context, {
        summary: 'Time Sheet submitted Successfully',
        displayMode: 'transient',
        type: 'confirmation',
      });

      try {
              // 3. Second Loop: Notifications (Equivalent to "forEachInFilteredData2")
      for (const currentData of $variables.FilteredData) {
        // Action: callFunctionNotification
        const notifyPayload = await $page.functions.notification(
          $application.variables.user,
          currentData.eqp_request_number
        );

storeApiName = 'postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report';

        // ---- ASSIGN VARIABLE ---- //

        

        // Action: callRestPostEQPORACLEWORKLIPOPUPNOTIFI1Report
         const restResponse2 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',
          body: notifyPayload,
          headers: {
'R_PAGE_NAME': pageName,
'R_TRACE_ID': $application.variables.traceIdDisplay || null,
'R_USER_NAME': $application.user.username,
},
        });

        if (!restResponse2.ok) {
 
  errMsg =
    restResponse2.body?.detail ||
    restResponse2.body?.message ||
    (typeof restResponse2.body === 'string' ? restResponse2.body : null) ||
    restResponse2.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}
      }
      } catch (error) {
                  let errMessage =

error?.message ||

 error?.body?.detail ||

error?.body?.message ||

(typeof error?.body === 'string' ? error.body : null) ||

JSON.stringify(error);

const response = await Actions.callRest(context, {

endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
headers: {
'R_PAGE_NAME': pageName,
'R_TRACE_ID': $application.variables.traceIdDisplay || null,
'R_USER_NAME': $application.user.username,
},

body: {

'p_api_name': storeApiName,

'p_debug_message':errMessage

 },

});



await Actions.fireNotificationEvent(context, {

summary: 'ERROR',

message: errMessage,

displayMode: 'persist',

type: 'error',

});
      } 


    }
  }

  return TR_SubmitBtnAction_JS;
});