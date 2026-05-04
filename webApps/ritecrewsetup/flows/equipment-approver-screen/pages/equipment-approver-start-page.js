define([], () => {
  'use strict';

  class PageModule {
    getsysdate() {
      let mydate = new Date();
      return mydate;
    };

    buildEquipmentPayloadArray(record) {
      function formatDate(date) {
        return date.toISOString().split('T')[0];
      }
      const startDate = new Date(record.req_start_date);
      const endDate = new Date(record.req_end_date);
      const dayQuantityMap = {
        0: Number(record.sun_quantity || 0),
        1: Number(record.mon_quantity || 0),
        2: Number(record.tue_quantity || 0),
        3: Number(record.wed_quantity || 0),
        4: Number(record.thu_quantity || 0),
        5: Number(record.fri_quantity || 0),
        6: Number(record.sat_quantity || 0)
      };
      const payloadArray = [];
      let current = new Date(startDate);
      let lastKnownQty = 0;
      while (current <= endDate) {
        const dayIndex = current.getDay();
        const todayQty = dayQuantityMap[dayIndex];
        if (todayQty > 0) lastKnownQty = todayQty;
        const finalQty = lastKnownQty;
        const expDate = formatDate(current);
        payloadArray.push({
          "ExpenditureBatch": `${record.expenditure_batch}-${expDate}`,
          "BusinessUnit": record.business_unit,
          "TransactionSource": record.transactionsource,
          "Document": record.document,
          "DocumentEntry": record.document_entry,
          "OriginalTransactionReference": `${record.eqp_request_number}-${record.expenditure_batch}-${expDate}`,
          "Quantity": finalQty,
          "NonlaborResource": record.nonlabor_resource,
          "NonlaborResourceOrganization": record.nonlabor_resource_organization,
          "TransactionCurrency": record.transactioncurrency,
          "TransactionCurrencyCode": record.transactioncurrencycode,
          "AccountingDate": expDate,
          "ProjectStandardCostCollectionFlexfields": [
            {
              "_EXPENDITURE_ITEM_DATE": expDate,
              "_PROJECT_ID_Display": record.project_number,
              "_TASK_ID_Display": record.task_number,
              "_EXPENDITURE_TYPE_ID_Display": record.expenditure_type,
              "_ORGANIZATION_ID_Display": record.organization_id
            }
          ]
        });
        current.setDate(current.getDate() + 1);
      }
      return payloadArray;
    }



    postErrorCode(data, user, row) {
      let payload = {
        "p_menu_name": "TimeEntry",
        "p_page_name": "equipment-approver-start",
        "p_error": data,
        "p_eqp_request_number": row.eqp_request_number,
        "p_eqp_request_id": row.equipment_request_id,
        "p_created_by": user
      };
      return payload;
    }

    postError(arg1) {
      let resp = {
        "status": "ERROR",
        "approved_flag": "Y",
        "batch_id": arg1.batch_id
      };

      return resp;
    }

    extractOracleErrorMessages(errorStr) {
      if (!errorStr) return "";
      let cleaned = errorStr.replace(/JBO-[A-Z]+:::[A-Z0-9_]+:\s*/g, "");
      cleaned = cleaned.replace(/<[^>]*>/g, "");
      cleaned = cleaned.replace(/\s+/g, " ").trim();
      return cleaned;
    }


    getWeekDateArray(weekRange, keyName = "date", includeYear = false) {
      // weekRange e.g. "5-Jan-2026 to 11-Jan-2026"
      if (!weekRange || typeof weekRange !== "string") return [];

      // normalize spaces and split
      weekRange = weekRange.replace(/\s+/g, " ").trim();
      const parts = weekRange.split(" to ");
      if (parts.length !== 2) return [];

      const [startStrRaw, endStrRaw] = parts;
      const startStr = startStrRaw.trim();
      const endStr = endStrRaw.trim();

      const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
      const monthNames = Object.keys(months);

      function parseDateToken(token) {
        // token like "5-Jan-2026" or "05-Jan-2026"
        const seg = token.split("-");
        if (seg.length !== 3) return null;
        const day = Number(seg[0]);
        const mon = seg[1];
        const year = Number(seg[2]);
        if (!day || !months.hasOwnProperty(mon) || !year) return null;
        return new Date(year, months[mon], day);
      }

      function formatShort(d) { // "5-Jan" or "5-Jan-2026"
        const day = d.getDate();
        const mon = monthNames[d.getMonth()];
        return includeYear ? `${day}-${mon}-${d.getFullYear()}` : `${day}-${mon}`;
      }

      const startDate = parseDateToken(startStr);
      const endDate = parseDateToken(endStr);
      if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate) || startDate > endDate) return [];

      const out = [];
      for (let cur = new Date(startDate); cur <= endDate; cur.setDate(cur.getDate() + 1)) {
        // create a fresh object each iteration
        out.push({ [keyName]: formatShort(new Date(cur)) });
      }
      return out;
    }

    editRowMarker(original, newrec) {
      return original === newrec;
    };

    getCurrentWeekRange() {
      const today = new Date();
      const day = today.getDay();
      const monday = new Date(today);
      const diffToMonday = day === 0 ? -6 : 1 - day;
      monday.setDate(today.getDate() + diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      return `${formatDate(monday)} to ${formatDate(sunday)}`;
    }



    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    revisionpayload(data, curr) {
      let payload = {
        "ExpenditureBatch": curr.expenditure_batch,
        "BusinessUnit": data.business_unit,
        "TransactionSource": data.transactionsource,
        "Document": data.document,
        "DocumentEntry": data.document_entry,
        "OriginalTransactionReference": data.originaltransactionreference,
        "Quantity": curr.quantity,
        "NonlaborResource": data.nonlabor_resource,
        "NonlaborResourceOrganization": data.nonlabor_resource_organization,
        "RawCostInTransactionCurrency": data.rawcostintransactioncurrency,
        "TransactionCurrency": data.transactioncurrency,
        "TransactionCurrencyCode": data.transactioncurrencycode,
        "AccountingDate": this.formatDateToYMD(curr.expenditure_item_date),
        "RawCostRateInTransactionCurrency": null,
        "BurdenedCostRateInTransactionCurrency": null,
        "ProjectStandardCostCollectionFlexfields": [
          {
            "_EXPENDITURE_ITEM_DATE": this.formatDateToYMD(curr.expenditure_item_date),
            "_PROJECT_ID_Display": data.project_number,
            "_TASK_ID_Display": data.task_number,
            "_EXPENDITURE_TYPE_ID_Display": data.expenditure_type,
            "_ORGANIZATION_ID_Display": data.expenditure_organization
          }
        ]
      };
      return payload;
    }

    addUniqId(data) {
      let uniqIdResult = [];
      if (data) {
        data.forEach((item, index) => {
          item.uid = index; // Start from 0
          uniqIdResult.push(item);
        });
      }
      return uniqIdResult;
    }

    formatDateToYMD(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }






    batchupdateJson(data) {
      let finalPayload = data.map(obj => {
        delete obj.isRowEdited;
        return obj;
      })
      return finalPayload;
    };

    checkStatus(records) {
      const hasError = records.some(r => r.status === "ERROR");
      const hasSubmitted = records.some(r => r.status === "SUBMITTED");
      const hasApproved = records.some(r => r.status === "APPROVED");
      if (hasError || hasSubmitted) {
        return true;
      }
      if (hasApproved) {
        return false;
      }
      return false;
    }





    updatejson(data) {
      const editedDate = data.filter(row => !row.isRowEdited).map(row => {
        const { isRowEdited, ...rest } = row;
        return rest;
      });
      return editedDate;
    }


    filterData(selected, data, selectedKeys, idAdd) {
      var keys = [];
      var filteredData = [];
      if (!idAdd) {
        if (selected.row.isAddAll()) {
          let iterator = selected.row.deletedValues();
          iterator.forEach(function (key) {
            keys.push(key);
          });
          filteredData = data.filter(function (obj) {
            return !keys.some(function (obj2) {
              return obj.batch_id === obj2;
            });
          });
        }
        else {
          filteredData = data.filter(function (obj) {
            return selectedKeys.some(function (obj2) {
              return obj.batch_id === obj2;
            });
          });
        }
      } else {
        if (selected.row.isAddAll()) {
          let iterator = selected.row.deletedValues();
          iterator.forEach(function (key) {
            keys.push(key);
          });
          filteredData = data.filter(function (obj) {
            return !keys.some(function (obj2) {
              return obj.batch_id === obj2;
            });
          });
        }
        else {
          filteredData = data.filter(function (obj) {
            return selectedKeys.some(function (obj2) {
              return obj.batch_id === obj2;
            });
          });
        }
      }
      console.log("filteredData", filteredData);
      return filteredData;
    };


    dateFormatter(startdate, enddate, crewDate) {

      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date(startdate);
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
      const t2 = new Date(enddate);
      let t2Date = t2.getDate() >= 10 ? t2.getDate() : "0" + t2.getDate();
      let start_date = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let end_date = t2Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      const t3 = new Date(crewDate);
      let t3Date = t3.getDate() >= 10 ? t3.getDate() : "0" + t3.getDate();
      let crew_date = t3Date + '-' + monthNames[t3.getMonth()] + '-' + t3.getFullYear();
      let sysdate = new Date();

      return { "startDate": start_date, "endDate": end_date, "sysdate": sysdate, "crewDate": crew_date };


    }


    getDay(date) {
      const givenDate = new Date(date);
      const dayOfWeek = givenDate.getDay();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const myday = days[dayOfWeek];
      let columns = [];
      const obj = {
        "sun": myday === "Sunday" ? true : false,
        "mon": myday === "Monday" ? true : false,
        "tue": myday === "Tuesday" ? true : false,
        "wed": myday === "Wednesday" ? true : false,
        "thu": myday === "Thursday" ? true : false,
        "fri": myday === "Friday" ? true : false,
        "sat": myday === "Saturday" ? true : false
      };
      if (obj.sun === true) {
        let suncolumns = [
          { "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
          { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
          { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
          { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
          { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
          { "headerText": "Mon In Time", "field": "sun_in_time" },
          { "headerText": "Mon Out Time", "field": "sun_out_time" },
          { "headerText": "Total Hours", "field": "sun_total_hours" },
          { "headerText": "Status", "field": "status" }
        ]
        columns = suncolumns;
      } else if (obj.mon === true) {
        let moncolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Mon In Time", "field": "mon_in_time" },
        { "headerText": "Mon Out Time", "field": "mon_out_time" },
        { "headerText": "Total Hours", "field": "mon_total_hours" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = moncolumns;
      } else if (obj.tue === true) {
        let tuecolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Tue In Time", "field": "tue_in_time" },
        { "headerText": "Tue Out Time", "field": "tue_out_time" },
        { "headerText": "Total Hours", "field": "tue_total_hours" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = tuecolumns;
      } else if (obj.wed === true) {
        let wedcolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Wed In Time", "field": "wed_in_time" },
        { "headerText": "Wed Out Time", "field": "wed_out_time" },
        { "headerText": "Total Hours", "field": "wed_total_hours" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = wedcolumns;
      } else if (obj.thu === true) {
        let thucolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Thu In Time", "field": "thu_in_time" },
        { "headerText": "Thu Out Time", "field": "thu_out_time" },
        { "headerText": "Total Hours", "field": "thu_total_hours" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = thucolumns;
      } else if (obj.fri === true) {
        let fricolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Fri In Time", "field": "fri_in_time" },
        { "headerText": "Fri Out Time", "field": "fri_out_time" },
        { "headerText": "Total Hours", "field": "fri_total_hours" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = fricolumns;
      } else if (obj.sat === true) {
        let satcolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Sat In Time", "field": "sat_in_time" },
        { "headerText": "Sat Out Time", "field": "sat_out_time" },
        { "headerText": "Total Hours", "field": "sat_total_hours" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = satcolumns;
      } else {
        columns = [];
      }
      return { "dateobj": obj, "columns": columns };

    }

    payloadGenerator(data, user, startdate, endDate, daterange, crewDate, specific, weekid) {
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date();
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
      let creationDate = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let obj = {
        "p_crewsetup_id": data.crewsetup_id,
        "p_crewsetup_eqp_line_id": data.crewsetup_eqp_line_id,
        "p_business_unit": null,
        "p_expenditure_organization": data.expenditure_type,
        "p_work_type": null,
        "p_nonlabor_resource": data.non_labor_resource,
        "p_organization_id": null,
        "p_customer_id": data.customer_id,
        "p_contract_id": data.contract_id,
        "p_project_id": data.project_id,
        "p_project_number": data.project_number,
        "p_project_name": null,
        "p_task_id": data.task_id,
        "p_task_number": null,
        "p_task_name": data.task_name,
        "p_time_entry_mode": data.time_entry_mode,
        "p_sun_quantity": data.sun_quantity,
        "p_mon_quantity": data.mon_quantity,
        "p_tue_quantity": data.tue_quantity,
        "p_wed_quantity": data.wed_quantity,
        "p_thu_quantity": data.thu_quantity,
        "p_fri_quantity": data.fri_quantity,
        "p_sat_quantity": data.sat_quantity
      };

      return obj;
    }

    updateAllPayloadGenerator(crewsetupid, week, date, filterArray, updateobj) {
      const timeentryweekid = filterArray.map(obj => obj.timeentry_week_id).join(',');
      const person_id = filterArray.map(obj => obj.person_id).join(',');
      let obj = {
        crewsetup_id: crewsetupid,
        crew_week: week,
        personId: person_id,
        timeentry_week_id: timeentryweekid,
        mon_in_time: updateobj.mon_in_time,
        tue_in_time: updateobj.tue_in_time,
        wed_in_time: updateobj.wed_in_time,
        thu_in_time: updateobj.thu_in_time,
        fri_in_time: updateobj.fri_in_time,
        sat_in_time: updateobj.sat_in_time,
        sun_in_time: updateobj.sun_in_time,
        mon_out_time: updateobj.mon_out_time,
        tue_out_time: updateobj.tue_out_time,
        wed_out_time: updateobj.wed_out_time,
        thu_out_time: updateobj.thu_out_time,
        fri_out_time: updateobj.fri_out_time,
        sat_out_time: updateobj.sat_out_time,
        sun_out_time: updateobj.sun_out_time,
        comments: updateobj.comments ? updateobj.comments : ""
      }

      return obj;

    }

    updateEachPayloadGenerator(crewsetupid, week, date, row, updateobj, specific, weekobj) {
      let obj;
      if (specific === "WEEK") {
        obj = {
          "person_id": row.person_id
          , "crewsetup_id": crewsetupid
          , "crewsetup_line_id": row.crewsetup_line_id
          , "crew_week": week
          , "crew_date": date
          , "timeentry_week_id": row.timeentry_week_id
          , "mon_in_time": updateobj.mon_in_time
          , "tue_in_time": updateobj.tue_in_time
          , "wed_in_time": updateobj.wed_in_time
          , "thu_in_time": updateobj.thu_in_time
          , "fri_in_time": updateobj.fri_in_time
          , "sat_in_time": updateobj.sat_in_time
          , "sun_in_time": updateobj.sun_in_time
          , "mon_out_time": updateobj.mon_out_time
          , "tue_out_time": updateobj.tue_out_time
          , "wed_out_time": updateobj.wed_out_time
          , "thu_out_time": updateobj.thu_out_time
          , "fri_out_time": updateobj.fri_out_time
          , "sat_out_time": updateobj.sat_out_time
          , "sun_out_time": updateobj.sun_out_time
          , "comments": updateobj.comments ? updateobj.comments : ""
        }
      } else if (specific === "DAY") {
        if (weekobj.mon) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "mon_in_time": updateobj.mon_in_time
            , "mon_out_time": updateobj.mon_out_time
          }
        } else if (weekobj.tue) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "tue_in_time": updateobj.tue_in_time
            , "tue_out_time": updateobj.tue_out_time
          }
        } else if (weekobj.wed) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "wed_in_time": updateobj.wed_in_time
            , "wed_out_time": updateobj.wed_out_time
          }
        } else if (weekobj.thu) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "thu_in_time": updateobj.thu_in_time
            , "thu_out_time": updateobj.thu_out_time
          }
        } else if (weekobj.fri) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "fri_in_time": updateobj.fri_in_time
            , "fri_out_time": updateobj.fri_out_time
          }
        } else if (weekobj.sat) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "sat_in_time": updateobj.sat_in_time
            , "sat_out_time": updateobj.sat_out_time
          }
        } else if (weekobj.sun) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "sun_in_time": updateobj.sun_in_time
            , "sun_out_time": updateobj.sun_out_time
          }
        }

      } else {
        obj = {};
      }


      return obj;

    }




    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    checkAllFunc(arg1) {
      for (var i in arg1) {
        arg1[i].selected = true;
      }
      console.log("checkAll", arg1);
      return arg1;
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    uncheckAll(arg1) {
      for (var i in arg1) {
        arg1[i].selected = false;
      }
      return arg1;
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    consoleFunc(arg1) {

      console.log("TEST222", arg1);
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    createApproveReq(arg1) {
      let resp = {
        "status": "APPROVED",
        "approved_flag": "Y",
        "batch_id": arg1.batch_id
      };

      return resp;
    }
    createRejectReq(arg1) {
      let resp = {
        "status": "REJECTED",
        "approved_flag": "N",
        "batch_id": arg1.batch_id
      };

      return resp;
    }
  }

  return PageModule;
});
