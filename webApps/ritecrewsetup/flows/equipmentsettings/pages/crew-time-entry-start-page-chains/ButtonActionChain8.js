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

  class ButtonActionChain8 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      try {

        const callFunction = await this.createPayload(context, { arg1: $variables.selectedBuId, arg2: $variables.selectedBuName, arg3: $variables.searchObjParams.costingVal, arg4: $variables.selectedDay, arg5: $variables.selectedExpOrgId, arg6: $variables.selectedName, arg7: $variables.selectedTrxSrcId, arg8: $variables.selectedTrxSrcName, arg9: $variables.batchPrefix, arg10: $variables.depCost ? "Y" : "N", arg11: $variables.adhocTS ? "Y" : "N", arg13: $variables.selecteddocument_entry_name, arg12: $variables.selecteddocumentname, arg14: $variables.isShipDoc, arg15: $variables.isMap });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEqpSettings',
          headers: {
            'R_PAGE_NAME': 'equipmentsettings',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          body: callFunction,
        });
        if (!response.ok) {
          let errMsg =
            response.body?.detail ||
            response.body?.message ||
            (typeof response.body === 'string' ? response.body : null) ||
            response.statusText ||
            'Unknown API Error';

          throw new Error(errMsg);
        } else {
           await Actions.fireNotificationEvent(context, {
             summary: 'Settings created Successfully.',
             type: 'confirmation',
             displayMode: 'transient',
           });
        }

        // if (!response.ok) {
        //   await Actions.fireNotificationEvent(context, {
        //     summary: 'Error exists please contact Administrator.',
        //   });

        //   return;
        // }

      } catch (error) {
        const errorMessage = error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'equipmentsettings',
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.user.username,
          },
          body: {
            "p_api_name": 'postEqpSettings',
            "p_debug_message": errorMessage
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });
      }
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.arg1 
     */
    async createPayload(context, { arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15 }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const today = new Date().toISOString().slice(0, 10);
      let payload = {
        "org_id": arg1,
        "business_unit": arg2,
        "costing": arg3,
        "week_end_day": arg4,
        "eqp_exp_org_id": arg5,
        "equipment_owning_organization": arg6,
        "trx_source_id": arg7,
        "project_transaction_source": arg8,
        "expenditure_batch_prefix": arg9,
        "include_depreciation_cost": arg10,
        "enable_adhoc_timesheet": arg11,
        "project_transaction_document": arg12,
        "project_tran_doc_entry": arg13,
        "attribute1": "Value1",
        "attribute2": "Value2",
        "attribute3": "Value3",
        "attribute4": "Value4",
        "attribute5": "Value5",
        "attribute6": "Value6",
        "attribute7": "Value7",
        "attribute8": "Value8",
        "attribute9": "Value9",
        "attribute10": "Value10",
        "attribute11": "Value11",
        "attribute12": "Value12",
        "attribute13": "Value13",
        "attribute14": "Value14",
        "attribute15": "Value15",
        "created_by": "",
        "created_date": today,
        "last_updated_by": "",
        "shipping_doc_required": arg14,
        "p_map_required": arg15,
        "last_update_date": today


      };
      return payload;
    }
  }

  return ButtonActionChain8;
});
