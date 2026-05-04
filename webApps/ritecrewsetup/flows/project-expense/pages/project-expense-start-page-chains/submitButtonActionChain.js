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

  class submitButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let storeApiName;
let errMsg;
let pageName = 'project-expense';

      try {

             if ($variables.israwCost) {

        const validateGroup = await $application.functions.validateGroup('expense');

        if (validateGroup === "valid") {

          if ($variables.selectionrow.project_id) {

            const loadingDialogOpen = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'open',
            });

            const saveProjectExpenseData = await $functions.saveProjectExpenseData($variables.projExpenseObj, $variables.selectionrow, $application.variables.user, $variables.israwCost);

              storeApiName = 'postEQPRite_ProjectMISCTransactions';

            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postEQPRite_ProjectMISCTransactions',
              body: saveProjectExpenseData,
              headers: {
                'R_PAGE_NAME': pageName,
                'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                'R_USER_NAME': $application.user.username,
              },
            });

            if (!response.ok) {
 
  errMsg =
    response.body?.detail ||
    response.body?.message ||
    (typeof response.body === 'string' ? response.body : null) ||
    response.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}

            if (response.ok) {

              $variables.projExpenseObj.originalTransactionReference = response.body.batch_name;

              const response4 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/getEQPRite_MISCTransactions',
                uriParams: {
                  'p_business_unit': $variables.selectionrow.business_unit,
                },
              });

              const unprocessedCost = await $functions.unprocessedCost($variables.selectionrow, $variables.projExpenseObj, response.body.batch_name, response4.body.items[0]);

                storeApiName = 'postFscmRestApiResources11_13_18_05UnprocessedProjectCosts';

              const response3 = await Actions.callRest(context, {
                endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05UnprocessedProjectCosts',
                body: unprocessedCost,
                headers: {
                  'R_PAGE_NAME': pageName,
                  'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                  'R_USER_NAME': $application.user.username,
                },
              });

              if (!response3.ok) {
 
  errMsg =
    response3.body?.detail ||
    response3.body?.message ||
    (typeof response3.body === 'string' ? response3.body : null) ||
    response3.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}

              if (response3.ok) {
                let obj = {
                  "p_oracle_unprocssed_ref": response3.body.UnprocessedTransactionReferenceId
                };
                  storeApiName = 'putEQPRite_ProjectMISCTransactions';

                const response5 = await Actions.callRest(context, {
                  endpoint: 'TimeRite_Ords_Service/putEQPRite_ProjectMISCTransactions',
                  uriParams: {
                    'p_batch_name': response.body.batch_name,
                  },
                  body: obj,
                  headers: {
                    'R_PAGE_NAME': pageName,
                    'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                    'R_USER_NAME': $application.user.username,
                  },
                });

                if (!response5.ok) {
 
  errMsg =
    response5.body?.detail ||
    response5.body?.message ||
    (typeof response5.body === 'string' ? response5.body : null) ||
    response5.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}
                const loadingDialogClose = await Actions.callComponentMethod(context, {
                  selector: '#loadingDialog',
                  method: 'close',
                });

                await Actions.resetVariables(context, {
                  variables: [
    '$variables.projExpenseObj',
  ],
                });

                await Actions.fireNotificationEvent(context, {
                  type: 'confirmation',
                  summary: 'Project Expense Transaction Created',
                  displayMode: 'transient',
                });

              } else {
                const loadingDialogClose3 = await Actions.callComponentMethod(context, {
                  selector: '#loadingDialog',
                  method: 'close',
                });

                await Actions.fireNotificationEvent(context, {
                  summary: 'Failed To Create Project Expense',
                  type: 'error',
                  displayMode: 'transient',
                  message: response3.body,
                });

              }
            } else {
              const loadingDialogClose2 = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                summary: 'Failed To Save Project Expense Details',
                type: 'error',
                displayMode: 'transient',
              });

            }
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Please Select The Record ',
              type: 'error',
              displayMode: 'transient',
            });

          }

        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Fill All Required Fields',
            type: 'error',
            displayMode: 'transient',
          });

        }
      } else {
        const validateGroup2 = await $application.functions.validateGroup('expense');

        if (validateGroup2 === "valid") {
          if ($variables.selectionrow.project_id) {
            const loadingDialogOpen2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'open',
            });

            const saveProjectExpenseData2 = await $functions.saveProjectExpenseData($variables.projExpenseObj, $variables.selectionrow, $application.variables.user, $variables.israwCost);

              storeApiName = 'postEQPRite_ProjectMISCTransactions';

            const response2 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postEQPRite_ProjectMISCTransactions',
              body: saveProjectExpenseData2,
              headers: {
                'R_PAGE_NAME': pageName,
                'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                'R_USER_NAME': $application.user.username,
              },
            });

            if (!response2.ok) {
 
  errMsg =
    response2.body?.detail ||
    response2.body?.message ||
    (typeof response2.body === 'string' ? response2.body : null) ||
    response2.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}

            if (response2.ok) {
              $variables.projExpenseObj.originalTransactionReference = response2.body.batch_name;

              const response6 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/getEQPRite_MISCTransactions',
                uriParams: {
                  'p_business_unit': $variables.selectionrow.business_unit,
                },
              });

              if (response6.ok) {

                const unprocessedCost2 = await $functions.unprocessedCost($variables.selectionrow, $variables.projExpenseObj, response2.body.batch_name, response6.body.items[0]);

                  storeApiName = 'postFscmRestApiResources11_13_18_05UnprocessedProjectCosts';

                const response7 = await Actions.callRest(context, {
                  endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05UnprocessedProjectCosts',
                  body: unprocessedCost2,
                  headers: {
                    'R_PAGE_NAME': pageName,
                    'R_TRACE_ID': $application.variables.traceIdDisplay || null,
                    'R_USER_NAME': $application.user.username,
                  },
                });
                if (!response7.ok) {
 
  errMsg =
    response7.body?.detail ||
    response7.body?.message ||
    (typeof response7.body === 'string' ? response7.body : null) ||
    response7.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}

                if (response7.ok) {
                   let obj = {
                  "p_oracle_unprocssed_ref": response7.body.UnprocessedTransactionReferenceId
                };
                    storeApiName = 'putEQPRite_ProjectMISCTransactions';
                  const response8 = await Actions.callRest(context, {
                    endpoint: 'TimeRite_Ords_Service/putEQPRite_ProjectMISCTransactions',
                    uriParams: {
                      'p_batch_name': response2.body.batch_name,
                    },
                    body: obj,
                    headers: {
                      'R_PAGE_NAME': pageName,
                      'R_TRACE_ID': $application.variables.traceIdDisplay,
                      'R_USER_NAME': $application.user.username,
                    },
                  });

                  if (!response8.ok) {
 
  errMsg =
    response8.body?.detail ||
    response8.body?.message ||
    (typeof response8.body === 'string' ? response8.body : null) ||
    response8.statusText ||
    'API Error';
 
  throw new Error(errMsg);
 
}

                  const loadingDialogClose5 = await Actions.callComponentMethod(context, {
                    selector: '#loadingDialog',
                    method: 'close',
                  });

                  await Actions.resetVariables(context, {
                    variables: [
    '$variables.projExpenseObj',
  ],
                  });

                  await Actions.fireNotificationEvent(context, {
                    summary: 'Project Expense Transaction Created',
                    type: 'confirmation',
                    displayMode: 'transient',
                  });
                }else{
                  const loadingDialogClose6 = await Actions.callComponentMethod(context, {
                    selector: '#loadingDialog',
                    method: 'close',
                  });

                  await Actions.fireNotificationEvent(context, {
                    summary: 'Failed To Create Project Expense Transaction',
                    displayMode: 'transient',
                    type: 'error',
                    message: 'response7.body',
                  });
                  
                }
              }
            }
          }else{
            const loadingDialogClose4 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Please Select The Record ',
              type: 'error',
              displayMode: 'transient',
            });
          }
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Fill All Required Fields',
            type: 'error',
            displayMode: 'transient',
          });
          
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
 
      } finally {
                    const loadingDialogClose4 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });
      }

 
    }
  }

  return submitButtonActionChain;
});
