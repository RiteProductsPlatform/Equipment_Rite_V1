define([], () => {
  'use strict';

  /**
   * Calculate equipment rental cost for a timesheet row using rate schedule tiers.
   *
   * @param {Object} rowData  - A single row from approverMainTableADP / FilteredData
   * @param {Array}  rateRows - The items array from getRateScheduleDetailsbyName response
   * @returns {Object} { tier, uom, effectiveDays, effectiveHours, costRateRaw, calcCost }
   */
  function calculateEquipmentCost(rowData, rateRows) {

    // STEP A — Count effective days (only count day columns where value > 0)
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

    // STEP B — Determine tier using thresholds from rateRows
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
        tier: 'Unknown',
        uom: 'N/A',
        effectiveDays: effectiveDays,
        effectiveHours: effectiveHours,
        costRateRaw: 0,
        calcCost: 0
      };
    }

    const costRate = parseFloat(selectedRate.cost_rate) || 0;
    const uom = selectedRate.uom;

    // STEP C — Period divisor
    const periodDivisor =
      uom === 'Hour'  ? 1  :
      uom === 'Day'   ? 1  :
      uom === 'Week'  ? 7  :
      uom === 'Month' ? 30 : 1;

    // STEP D — Calculate cost
    const calcQty = effectiveDays;
    const calcCost = calcQty * (costRate / periodDivisor);

    // STEP E — Return result object
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
   *
   * @param {Object} rowData       - A single row from FilteredData
   * @param {number} calcCost      - Total calculated cost from calculateEquipmentCost
   * @param {number} effectiveDays - Number of days with quantity > 0
   * @returns {Array} Array of payload objects for Fusion unprocessedProjectCosts POST
   */
  function buildEquipmentPayloadWithCost(rowData, calcCost, effectiveDays) {

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

    // Calculate per-day cost share
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
          // Last active day gets the remainder to fix rounding
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
            "_ORGANIZATION_ID_Display": rowData.organization_id
          }
        ]
      });

      current.setDate(current.getDate() + 1);
    }

    return payloadArray;
  }

  return { calculateEquipmentCost, buildEquipmentPayloadWithCost };
});
