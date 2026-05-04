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

  class PostCostCalculationActionChain extends ActionChain {

    /**
     * Calculate equipment rental cost for a timesheet row using rate schedule tiers.
     */
    calculateEquipmentCost(rowData, rateRows) {
      const days = [
        'mon_quantity', 'tue_quantity', 'wed_quantity',
        'thu_quantity', 'fri_quantity', 'sat_quantity', 'sun_quantity'
      ];
      let effectiveDays = 0;
      let effectiveHours = 0;
      days.forEach(d => {
        const hrs = parseFloat(rowData[d]) || 0;
        if (hrs > 0) {
          effectiveDays++;
          effectiveHours += hrs;
        }
      });

      const tierOrder = { 'Hour': 1, 'Day': 2, 'Week': 3, 'Month': 4 };

      let qualifyingRows = rateRows.filter(r => {
        const threshold = parseFloat(r.rounding_threshold) || 0;
        if (r.uom === 'Month') return effectiveDays >= 21;
        if (r.uom === 'Hour') return effectiveDays === 0;
        return threshold <= effectiveDays && effectiveDays > 0;
      });

      if (qualifyingRows.length === 0) {
        qualifyingRows = rateRows.filter(r => r.uom === 'Hour');
      }

      qualifyingRows.sort((a, b) =>
        (tierOrder[b.uom] || 0) - (tierOrder[a.uom] || 0));

      const selectedRate = qualifyingRows[0];

      if (!selectedRate) {
        return {
          tier: 'Unknown', uom: 'N/A',
          effectiveDays: effectiveDays, effectiveHours: effectiveHours,
          costRateRaw: 0, calcCost: 0
        };
      }

      const costRate = parseFloat(selectedRate.cost_rate) || 0;
      const uom = selectedRate.uom;

      const periodDivisor =
        uom === 'Hour'  ? 1  :
        uom === 'Day'   ? 1  :
        uom === 'Week'  ? 7  :
        uom === 'Month' ? 30 : 1;

      const calcCost = effectiveDays * (costRate / periodDivisor);

      return {
        tier: uom === 'Hour' ? 'Hourly' :
              uom === 'Day'  ? 'Daily'  :
              uom === 'Week' ? 'Weekly' : 'Monthly',
        uom: uom,
        effectiveDays: effectiveDays,
        effectiveHours: effectiveHours,
        costRateRaw: costRate,
        calcCost: Math.round(calcCost * 100) / 100
      };
    }

    /**
     * Build Fusion daily payloads with cost distributed across active days.
     */
    buildEquipmentPayloadWithCost(rowData, calcCost, effectiveDays) {

      function formatDate(date) {
        return date.toISOString().split('T')[0];
      }
      const rawStart = rowData.req_start_date || rowData.week_start_date || rowData.effective_start_date || rowData.creation_date;
      const rawEnd = rowData.req_end_date || rowData.week_end_date || rowData.effective_end_date || rawStart;

      const startDate = new Date(rawStart);
      const endDate = new Date(rawEnd);

      const dayQuantityMap = {
        0: Number(rowData.sun_quantity || 0),
        1: Number(rowData.mon_quantity || 0),
        2: Number(rowData.tue_quantity || 0),
        3: Number(rowData.wed_quantity || 0),
        4: Number(rowData.thu_quantity || 0),
        5: Number(rowData.fri_quantity || 0),
        6: Number(rowData.sat_quantity || 0)
      };

      const dailyCostShare =
        Math.round((calcCost / effectiveDays) * 100) / 100;

      // First pass — find all active dates for rounding correction
      const activeDates = [];
      let scanner = new Date(startDate);
      let lastKnownQtyTemp = 0;
      while (scanner <= endDate) {
        const dayIndex = scanner.getDay();
        const todayQty = dayQuantityMap[dayIndex];
        if (todayQty > 0) lastKnownQtyTemp = todayQty;
        if (lastKnownQtyTemp > 0) {
          activeDates.push(formatDate(new Date(scanner)));
        }
        scanner.setDate(scanner.getDate() + 1);
      }
      const lastActiveDate = activeDates[activeDates.length - 1];

      // Second pass — build payloads
      const payloadArray = [];
      let current = new Date(startDate);
      let lastKnownQty = 0;

      while (current <= endDate) {
        const dayIndex = current.getDay();
        const finalQty = dayQuantityMap[dayIndex];
        const expDate = formatDate(new Date(current));

        let dayCost = 0;
        if (finalQty > 0) {
          if (expDate === lastActiveDate) {
            dayCost = Math.round(
              (calcCost - (dailyCostShare * (effectiveDays - 1)))
              * 100) / 100;
          } else {
            dayCost = dailyCostShare;
          }
        }

        payloadArray.push({
          "ExpenditureBatch":
            `${rowData.expenditure_batch}-${expDate}`,
          "BusinessUnit": rowData.business_unit,
          "TransactionSource": rowData.transactionsource,
          "Document": rowData.document,
          "DocumentEntry": rowData.document_entry,
          "OriginalTransactionReference":
            `${rowData.eqp_request_number}-${rowData.expenditure_batch}-${expDate}`,
          "Quantity": finalQty,
          "NonlaborResource": rowData.nonlabor_resource,
          "NonlaborResourceOrganization":
            rowData.nonlabor_resource_organization,
          "RawCostInTransactionCurrency": dayCost,
          "RawCostRateInTransactionCurrency": dayCost,
          "BurdenedCostRateInTransactionCurrency": dayCost,
          "TransactionCurrency": rowData.transactioncurrency,
          "TransactionCurrencyCode": rowData.transactioncurrencycode,
          "AccountingDate": expDate,
          "ProjectStandardCostCollectionFlexfields": [
            {
              "_EXPENDITURE_ITEM_DATE": expDate,
              "_PROJECT_ID_Display": rowData.project_number,
              "_TASK_ID_Display": rowData.task_number,
              "_EXPENDITURE_TYPE_ID_Display": rowData.expenditure_type,
              "_ORGANIZATION_ID_Display": rowData.expenditure_organization || rowData.nonlabor_resource_organization || (rowData.organization_id !== "OAK PPM" ? rowData.organization_id : null) || rowData.organization_id
            }
          ]
        });

        current.setDate(current.getDate() + 1);
      }

      return payloadArray;
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      // Guard: check if any rows are selected
      if (!$variables.FilteredData || $variables.FilteredData.length === 0) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please select a timesheet row first',
          type: 'warning',
          displayMode: 'transient',
        });
        return;
      }

      if ($variables.FilteredData[0].status !== "APPROVED") {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please select an Approved row to post cost',
          type: 'warning',
          displayMode: 'transient',
        });
        return;
      }

      // STEP A — Take the first selected row
      const firstRow = $variables.FilteredData[0];

      let FailedAPIName = '';

      try {
        // Call the rate schedule endpoint (hardcoded p_eqp_rate_row_id = "522" for MVP)
        const rateResponse = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',
          uriParameters: {
            p_eqp_rate_row_id: '522',
          },
        });

        if (!rateResponse.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to fetch rate schedule data',
            type: 'error',
            displayMode: 'transient',
          });
          return;
        }

        const rateRows = rateResponse.body.items || [];

        if (rateRows.length === 0) {
          await Actions.fireNotificationEvent(context, {
            summary: 'No rate schedule rows returned for the given rate row ID',
            type: 'warning',
            displayMode: 'transient',
          });
          return;
        }

        // Calculate cost
        const result = this.calculateEquipmentCost(firstRow, rateRows);
        const calcCost = result.calcCost;
        const effectiveDays = result.effectiveDays;
        const tier = result.tier;

        // STEP B — Guard: if effectiveDays = 0, cannot post
        if (effectiveDays === 0) {
          await Actions.fireNotificationEvent(context, {
            summary: 'No active hours found for this row — cannot post cost',
            type: 'warning',
            displayMode: 'transient',
          });
          return;
        }

        // STEP C — Build Fusion daily payloads with cost
        const payloadArray = this.buildEquipmentPayloadWithCost(
          firstRow, calcCost, effectiveDays
        );

        // STEP D — Open loading dialog
        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        // STEP E — Post each payload to Fusion (serial mode)
        let responsevar;
        await ActionUtils.forEach(payloadArray, async (item, index) => {
          FailedAPIName = 'postFscmRestApiResources11_13_18_05UnprocessedProjectCosts';

          const response = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05UnprocessedProjectCosts',
            body: item,
          });
          if (!response.ok) {
           let errMsg =
              response.body?.detail ||
              response.body?.message ||
              (typeof response.body === 'string' ? response.body : null) ||
              response.statusText ||
              'Unknown API Error';
 
            throw new Error(errMsg);
        }
          responsevar = response;
        }, { mode: 'serial' });

        // STEP F — Check response and update status
        if (responsevar.ok) {
          FailedAPIName = 'putEqpSubmitTimeEntry';

          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/putEqpSubmitTimeEntry',
            headers: {
              'R_PAGE_NAME': 'equipment-approver-screen',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
            body: {
              "status": "APPROVED",
              "approved_flag": "Y",
              "batch_id": firstRow.batch_id
            },
          });
          if (!response2.ok) {
            let errMsg =
              response2.body?.detail ||
              response2.body?.message ||
              (typeof response2.body === 'string' ? response2.body : null) ||
              response2.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }

          await Actions.fireNotificationEvent(context, {
            summary: 'Cost posted: $' + calcCost.toFixed(2) +
                     ' | Tier: ' + tier +
                     ' | Effective Days: ' + effectiveDays,
            type: 'confirmation',
            displayMode: 'transient',
          });
        } else {

          FailedAPIName = 'putEqpSubmitTimeEntry';
          
          const response3= await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/putEqpSubmitTimeEntry',
            headers: {
              'R_PAGE_NAME': 'equipment-approver-screen',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
            body: {
              "status": "ERROR",
              "approved_flag": "N",
              "batch_id": firstRow.batch_id
            },
          });
          if (!response3.ok) {
            let errMsg =
              response3.body?.detail ||
              response3.body?.message ||
              (typeof response3.body === 'string' ? response3.body : null) ||
              response3.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }

          const errorBody = typeof responsevar.body === 'string' ? responsevar.body : JSON.stringify(responsevar.body);
          const errorMsg = await $functions.extractOracleErrorMessages(errorBody);
          const errorPayload = await $functions.postErrorCode(
            errorMsg,
            $application.variables.user || $application.user.username || "",
            firstRow
          );

          FailedAPIName = 'postEQPRite_ErrorDetails';

          const response4 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_ErrorDetails',
            headers: {
              'R_PAGE_NAME': 'equipment-approver-screen',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.user.username,
            },
            body: errorPayload,
          });
          if (!response4.ok) {
            let errMsg =
              response4.body?.detail ||
              response4.body?.message ||
              (typeof response4.body === 'string' ? response4.body : null) ||
              response4.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }

          let notificationMsg = 'Cost posting failed — row marked as ERROR';
          if (errorMsg) {
            if (errorMsg.includes('PJC_DUPLICATE_TXN') || errorMsg.includes('already exists')) {
              notificationMsg = 'Duplicate transaction — it already exists in Fusion';
            } else if (errorMsg.includes('LOV_NonlaborResourceOrganization') || errorMsg.includes('no matching row')) {
              notificationMsg = 'Invalid Organization setup — verify resource organization in Fusion';
            }
          }

          await Actions.fireNotificationEvent(context, {
            summary: notificationMsg,
            type: 'error',
            displayMode: 'transient',
          });
        }

        // STEP G — Close loading dialog
        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        // STEP H — Reset table data
        await Actions.resetVariables(context, {
          variables: [
            '$variables.approverMainTableADP.data',
          ],
        });

        // STEP I — Refresh the search
        await Actions.callChain(context, {
          chain: 'SearchButtonActionChain_New',
        });

      } catch (error) {
        // Close loading dialog if open
        try {
          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
        } catch (e) { /* dialog may not be open */ }

        await Actions.fireNotificationEvent(context, {
          summary: 'Error calculating/posting cost: ' + (error.message || error),
          type: 'error',
          displayMode: 'transient',
        });
        const errorMessage = error?.message ||
    error?.body?.detail ||
    error?.body?.message||
      "Unknown API Error";
 
        const response5 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_PAGE_NAME': 'equipment-approver-screen',
            'R_USER_NAME': $application.user.username,
          },
          body: {
         "p_api_name": FailedAPIName,
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
  }

  return PostCostCalculationActionChain;
});
