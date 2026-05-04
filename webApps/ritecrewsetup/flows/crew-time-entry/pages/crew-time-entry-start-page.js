define([], () => {
  'use strict';

  class PageModule {
    removeDuplicates(values) {

      const seen = new Set();
      return values.filter(item => {
        if (seen.has(item.equipment_name)) {
          return false;
        } else {
          seen.add(item.equipment_name);
          return true;
        }
      });
    }

    // function to return dates from start and end date oin a week -start

    // getWeekDateArray(weekRange) {
    //   // debugger;
    //   if (!weekRange) return [];

    //   // weekRange example: "5-Jan-2026 to 11-Jan-2026"
    //   const [startStr, endStr] = weekRange.split(" to ");

    //   const months = {
    //     Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    //     Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    //   };

    //   function parseDate(str) {
    //     const [day, mon, year] = str.split("-");
    //     return new Date(year, months[mon], Number(day));
    //   }

    //   function formatDate(d) {
    //     const day = d.getDate();
    //     const mon = Object.keys(months)[d.getMonth()];
    //     return `${day}-${mon}`;
    //   }

    //   const startDate = parseDate(startStr);
    //   const endDate = parseDate(endStr);

    //   let dates = [];
    //   let current = new Date(startDate);

    //   while (current <= endDate) {
    //     dates.push(formatDate(current));
    //     current.setDate(current.getDate() + 1);
    //   }

    //   return dates;
    // }

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



    //end 



    getsysdate() {
      let mydate = new Date();
      return mydate;
    };

    reloadPage() {
      window.location.reload();
    }

     addUniqId(data) {
      let uniqIdResult = [];
      if (data) {
        data.forEach((item, idex) => {
          item.uid = idex + 1;
          uniqIdResult.push(item);
        });
        return uniqIdResult;
      }
    }

    editRowMarker(original, newrec) {
      return original === newrec;
    };

    checkStatuses(data) {
      const statuses = data.map(item => item.status.toUpperCase());
      const hasSubmitted = statuses.includes("SUBMITTED");
      const hasApproved = statuses.includes("APPROVED");
      const count = statuses.filter(status => status === "SUBMITTED" || status === "APPROVED").length;
      if ((hasSubmitted && !hasApproved) || (!hasSubmitted && hasApproved)) {
        return false;
      }
      if (hasSubmitted && hasApproved && statuses.length === count) {
        return false;
      }
      return true;
    }


    createUriParams(project, dateRange, equipmentName, equipmentType, crewsetupId, customerval, prj_cust_type, eqpclass) {

      let uriParams = {
        "equipmentName": equipmentName !== undefined && equipmentName !== null ? equipmentName : "",
        "customerval": customerval !== undefined && customerval !== null ? customerval : "",
        "crewsetupId": crewsetupId !== undefined && crewsetupId !== null ? crewsetupId : "",
        "project": project !== undefined && project !== null ? project : "",
        "dateRange": dateRange !== undefined && dateRange !== null ? dateRange : "",
        "equipmentType": equipmentType !== undefined && equipmentType !== null ? equipmentType : "",
        "eqpclass": eqpclass !== undefined && eqpclass !== null ? eqpclass : ""

      };

      if (prj_cust_type === "Project") {
        uriParams.project = project !== undefined && project !== null ? project : "";
        uriParams.customerval = "";
      }
      if (prj_cust_type === "Customer") {
        uriParams.customerval = customerval !== undefined && customerval !== null ? customerval : "";
        uriParams.project = "";
      }

      return uriParams;

    }

    batchupdateJson(data) {
      let finalPayload = data.map(obj => {
        delete obj.isRowEdited;
        return obj;
      })
      return finalPayload;
    };
    getCostRateByHoursType(data, rtype) {
      let crate;
      if (data) {
        data.forEach((itm) => {
          if (itm.rate_types == rtype) {
            crate = itm.cost_rate;
          }
        });
      }
      return crate;
    }

    updatejson(data) {
      const editedDate = data.filter(row => !row.isRowEdited).map(row => {
        const { isRowEdited, ...rest } = row;
        return rest;
      });
      return editedDate;
    }

    postAttachments(rowData, file, user ,fileinfo) {
      let payload = {
        "p_equipment_request_id": rowData.equipment_request_id,
        "p_equipment_request_number": rowData.eqp_request_number,
        "p_page_name": "crew-time-entry-start",
        "p_file_name": fileinfo.name,
        "p_file_type": fileinfo.type,
        "p_file_content": file.data,
        "p_file_attachment": null,
        // "p_creation_date": this.getsystemdate(),
        "p_created_by": user,
        // "p_last_update_date": this.getsystemdate(),
        "p_last_updated_by": user
      };
      return payload;
    }

    downloadBase64File(base64Data, fileName) {
      const link = document.createElement('a');
      link.href = base64Data;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    converImageBase64(file) {
      return new Promise((resolve) => {
        const blobURL = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          function () {
            resolve({
              data: reader.result,
              url: blobURL,
            });
          },
          false
        );

        if (file) {
          reader.readAsDataURL(file);
        }
      });
    }

    getsystemdate() {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    notification(user, reqnum) {
      let payload =
      {
        "Message": "FYI- Request No." + reqnum + "  has been Submitted by. " + user,
        "TaskCreator": user,
        "Role_Name": "OII Equipment Time Entry Approver"
      };

      return payload;
    }

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

    // formatDate(inputDate) {
    //   const date = new Date(inputDate);
    //   const day = String(date.getDate()).padStart(2, '0');
    //   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //   const month = monthNames[date.getMonth()];
    //   const year = date.getFullYear();
    //   return `${day}-${month}-${year}`;
    // }

    formatDate(inputDate) {
      // Take only the date part, ignore time and timezone
      if (inputDate) {
        const [year, month, day] = inputDate.split('T')[0].split('-');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${day}-${monthNames[parseInt(month) - 1]}-${year}`;
      }

    }

    // getQtyCellStyle(status) {
    //   if (status && status.toUpperCase() === 'ASSIGNED') {
    //     return 'green-cell';
    //   }
    //   return '';
    // }

    colourcodes(status) {
      if (status) {
        if (status === "ASSIGNED") {
          return 'oj-table-body-cell.green-cell';
        }
      }
    }

    validateNonLaborResource(records) {
      if (!Array.isArray(records)) return false;

      return records.every(item => {
        const val = item.non_labor_resource;
        return val !== null && val !== undefined && val !== "";
      });
    }

    adjustQuantities(records, selectedWeekRange) {
      const dayFields = [
        "mon_quantity",
        "tue_quantity",
        "wed_quantity",
        "thu_quantity",
        "fri_quantity",
        "sat_quantity",
        "sun_quantity"
      ];

      // Parse date like "3-Nov-2025"
      function parseCustomDate(dateStr) {
        const [day, mon, year] = dateStr.split("-");
        const months = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
          Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        return new Date(year, months[mon], parseInt(day));
      }

      // Extract selected week start and end
      const [weekStartStr, weekEndStr] = selectedWeekRange.split(" to ");
      const selectedWeekStart = parseCustomDate(weekStartStr);
      const selectedWeekEnd = parseCustomDate(weekEndStr);

      // Helper to strip time (ignore timezone)
      const toDateOnly = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

      return records.map(record => {
        const start = toDateOnly(new Date(record.effective_start_date));
        const end = toDateOnly(new Date(record.effective_end_date));
        const weekStart = toDateOnly(selectedWeekStart);

        // Loop over each weekday field
        dayFields.forEach((dayField, index) => {
          const currentDate = new Date(weekStart);
          currentDate.setDate(weekStart.getDate() + index);

          const cur = toDateOnly(currentDate);

          // If date not in both record range & selected week → zero it
          if (cur < start || cur > end || cur < selectedWeekStart || cur > selectedWeekEnd) {
            record[dayField] = "0";
          }
        });
        // debugger;
        return record;
      });
    }





    areDatesWithinWeek(records, selectedWeekRange) {
      if (!Array.isArray(records) || !selectedWeekRange) return false;

      // Convert "3-Nov-2025" -> Date (no time, no timezone)
      function parseCustomDate(dateStr) {
        const months = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
          Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };

        const [day, mon, year] = dateStr.trim().split("-").map(s => s.trim());
        // Always strip time to midnight local
        return new Date(parseInt(year), months[mon], parseInt(day));
      }

      // Helper to strip time from any Date
      function stripTime(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      }

      // Split "17-Nov-2025 to 23-Nov-2025"
      const [startStr, endStr] = selectedWeekRange.split("to").map(s => s.trim());
      const weekStart = parseCustomDate(startStr);
      const weekEnd = parseCustomDate(endStr);

      return records.some(record => {
        // Parse ISO date strings from Fusion API
        const startDate = stripTime(new Date(record.effective_start_date));
        const endDate = stripTime(new Date(record.effective_end_date));

        if (isNaN(startDate) || isNaN(endDate)) return false;

        // Check for any overlap (inclusive of weekEnd day)
        const isStartWithin = startDate >= weekStart && startDate <= weekEnd;
        const isEndWithin = endDate >= weekStart && endDate <= weekEnd;
        const coversWeek = startDate <= weekStart && endDate >= weekEnd;

        return isStartWithin || isEndWithin || coversWeek;
      });
    }






    filterData(selected, data, selectedKeys, idAdd) {
      console.log("selectedKeys", selected);

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
              return obj.crewsetup_eqp_header_id === obj2;
            });
          });
        }
        else {
          filteredData = data.filter(function (obj) {
            return selectedKeys.some(function (obj2) {
              return obj.crewsetup_eqp_header_id === obj2;
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
              return obj.crewsetup_eqp_header_id === obj2;
            });
          });
        }
        else {
          filteredData = data.filter(function (obj) {
            return selectedKeys.some(function (obj2) {
              return obj.crewsetup_eqp_header_id === obj2;
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
          { "headerText": "Mon In Time", "field": "sun_in_time", "className": "oj-helper-text-align-end" },
          { "headerText": "Mon Out Time", "field": "sun_out_time", "className": "oj-helper-text-align-end" },
          { "headerText": "Total Hours", "field": "sun_total_hours", "className": "oj-helper-text-align-end" },
          { "headerText": "Status", "field": "status" }
        ]
        columns = suncolumns;
      } else if (obj.mon === true) {
        let moncolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Mon In Time", "field": "mon_in_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Mon Out Time", "field": "mon_out_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Total Hours", "field": "mon_total_hours", "className": "oj-helper-text-align-end" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = moncolumns;
      } else if (obj.tue === true) {
        let tuecolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Tue In Time", "field": "tue_in_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Tue Out Time", "field": "tue_out_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Total Hours", "field": "tue_total_hours", "className": "oj-helper-text-align-end" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = tuecolumns;
      } else if (obj.wed === true) {
        let wedcolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Wed In Time", "field": "wed_in_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Wed Out Time", "field": "wed_out_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Total Hours", "field": "wed_total_hours", "className": "oj-helper-text-align-end" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = wedcolumns;
      } else if (obj.thu === true) {
        let thucolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Thu In Time", "field": "thu_in_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Thu Out Time", "field": "thu_out_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Total Hours", "field": "thu_total_hours", "className": "oj-helper-text-align-end" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = thucolumns;
      } else if (obj.fri === true) {
        let fricolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Fri In Time", "field": "fri_in_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Fri Out Time", "field": "fri_out_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Total Hours", "field": "fri_total_hours", "className": "oj-helper-text-align-end" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = fricolumns;
      } else if (obj.sat === true) {
        let satcolumns = [{ "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Resource Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start" },
        { "headerText": "Sat In Time", "field": "sat_in_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Sat Out Time", "field": "sat_out_time", "className": "oj-helper-text-align-end" },
        { "headerText": "Total Hours", "field": "sat_total_hours", "className": "oj-helper-text-align-end" },
        { "headerText": "Status", "field": "status" }
        ]
        columns = satcolumns;
      } else {
        columns = [];
      }
      return { "dateobj": obj, "columns": columns };

    }

    getmaxheaderid(mydata) {
      // debugger;
      let data = JSON.parse(mydata);

      let maxCrewSetupEqpHeaderId = 0;
      // Loop through the items and find the max crewsetup_eqp_header_id
      for (let item of data) {
        if (item.crewsetup_eqp_header_id > maxCrewSetupEqpHeaderId) {
          maxCrewSetupEqpHeaderId = item.crewsetup_eqp_header_id;
        }
      }
      // Return the next id (max + 1), or 1 if no valid id was found
      return maxCrewSetupEqpHeaderId === 0 ? 1 : maxCrewSetupEqpHeaderId + 1;
    }

    payloadGenerator(data, user, startdate, endDate, daterange, crewDate, specific, weekid) {
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date();
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
      let creationDate = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let obj = {
        "p_equipment_name": data.equipment_name,
        "p_equipment_type": data.equipment_type,
        "p_hours_type": data.hours_type,
        "p_expenditure_type": data.expenditure_type,
        "p_unit_of_measure": data.unit_of_measure,
        "p_rate": data.cost_rate,
        "p_effective_start_date": data.effective_start_date,
        "p_effective_end_date": data.effective_end_date,
        "p_crewsetup_id": data.crewsetup_id,
        "p_crewsetup_eqp_header_id": data.iscopy ? "" : data.crewsetup_eqp_header_id,
        "p_business_unit": null,
        "p_expenditure_organization": data.non_labor_resource_organization,
        "p_work_type": null,
        "p_nonlabor_resource": data.non_labor_resource,
        "p_non_labor_resource_organization": data.non_labor_resource_organization,
        "p_organization_id": data.non_labor_resource_organization,
        "p_customer_id": data.customer_id,
        "p_contract_id": data.contract_id,
        "p_project_id": data.project_id,
        "p_project_number": data.project_number,
        "p_project_name": data.project_name,
        "p_task_id": data.task_id,
        "p_task_number": data.task_number,
        "p_task_name": data.task_name,
        "p_time_entry_mode": data.time_entry_mode,
        "p_crew_week": daterange,
        "p_sun_quantity": data.sun_quantity,
        "p_mon_quantity": data.mon_quantity,
        "p_tue_quantity": data.tue_quantity,
        "p_wed_quantity": data.wed_quantity,
        "p_thu_quantity": data.thu_quantity,
        "p_fri_quantity": data.fri_quantity,
        "p_sat_quantity": data.sat_quantity,
        "p_timesheet_week_id": weekid,
        "p_request_type": data.request_type,
        "p_customer": data.customer,
        "p_customer_site": data.customer_site,
        "p_equipment_id": data.equipment_id,
        "p_equipment_resource_class": data.equipment_resource_class,
        "p_equipment_number": data.equipment_number,
        "p_eqp_request_number": data.eqp_request_number,
        "upload_filecontent": data.upload_filecontent,
        "upload_filename": data.upload_filename,
        "upload_filetype": data.upload_filetype,
        "p_equipment_cart_number": data.equipment_cart_number,
        "p_auto_costing": data.auto_costing,
        "p_equipment_request_id": data.equipment_request_id,
        "p_equipment_req_cart_id": data.equipment_req_cart_id,
        "p_nonlabor_resource_rate_unit": data.nonlabor_resource_rate_unit,
        "p_estimate_price": data.estimate_price

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

    processFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const fileName = file.name;
          const fileType = file.type;
          resolve({
            fileName: fileName,
            fileType: fileType,
            fileContent: fileContent
          });
        };
        reader.onerror = function (error) {
          reject(error);
        };
      });
    }

    /**
 *
 * @param {String} arg1
 * @return {String}
 */
    updateSelRows(fileData, currentRow, selRows) {
      selRows.forEach(item => {
        if (item.crewsetup_eqp_header_id === currentRow.crewsetup_eqp_header_id) {
          item.p_file_content = fileData.fileContent;
          item.p_file_name = fileData.fileName;
          item.p_file_type = fileData.fileType;
          item.p_file_attachment = 'Yes';
        }
      });
      return selRows;
    }

    /**
  *
  * @param {String} arg1
  * @return {String}
  */
    updateDefaultCols(defCols, value) {
      let defaultColumns = [];
      if (value === 'Customer') {
        defaultColumns = [
          { "headerText": "", "field": "", "template": "action", "sortable": "disabled" },
          { "headerText": "", "field": "", "sortable": "disabled", "template": "upload" },
          { "headerText": "", "field": "", "template": "copy", "sortable": "disabled" },
          { "headerText": "Request Number", "field": "eqp_request_number" },
          { "headerText": "Equipment Name", "field": "equipment_name" },
          { "headerText": "Hours Type", "field": "hours_type" },
          { "headerText": "Customer", "field": "customer", "classname": "oj-read-only" },
          { "headerText": "Customer Site", "field": "customer_site", "classname": "oj-read-only" },
          { "headerText": "Rate", "field": "cost_rate" },
          { "headerText": "Unit of Measure", "field": "unit_of_measure" },
          { "headerText": "Currency Code", "field": "currency" },
          { "headerText": "Expenditure Type Name", "field": "expenditure_type", "classname": "oj-read-only" },
          { "headerText": "Mon Qty", "field": "mon_quantity" },
          { "headerText": "Tue Qty", "field": "tue_quantity" },
          { "headerText": "Wed Qty", "field": "wed_quantity" },
          { "headerText": "Thu Qty", "field": "thu_quantity" },
          { "headerText": "Fri Qty", "field": "fri_quantity" },
          { "headerText": "Sat Qty", "field": "sat_quantity" },
          { "headerText": "Sun Qty", "field": "sun_quantity" }
        ];
      }
      if (value === 'Project') {
        defaultColumns = [
          { "headerText": "", "field": "", "template": "action", "sortable": "disabled" },
          { "headerText": "", "field": "", "sortable": "disabled", "template": "upload" },
          { "headerText": "", "field": "", "template": "copy", "sortable": "disabled" },
          { "headerText": "Request Number", "field": "eqp_request_number" },
          { "headerText": "Equipment Name", "field": "equipment_name" },
          { "headerText": "Hours Type", "field": "hours_type" },
          { "headerText": "Project Name", "field": "project_name", "classname": "oj-read-only" },
          { "headerText": "Task Name", "field": "task_name" },
          { "headerText": "Rate", "field": "cost_rate" },
          { "headerText": "Unit of Measure", "field": "unit_of_measure" },
          { "headerText": "Currency Code", "field": "currency" },
          { "headerText": "Expenditure Type Name", "field": "expenditure_type", "classname": "oj-read-only" },
          { "headerText": "Mon Qty", "field": "mon_quantity" },
          { "headerText": "Tue Qty", "field": "tue_quantity" },
          { "headerText": "Wed Qty", "field": "wed_quantity" },
          { "headerText": "Thu Qty", "field": "thu_quantity" },
          { "headerText": "Fri Qty", "field": "fri_quantity" },
          { "headerText": "Sat Qty", "field": "sat_quantity" },
          { "headerText": "Sun Qty", "field": "sun_quantity" }
        ];
      }
      return defaultColumns;
    }
  }

  return PageModule;
});
