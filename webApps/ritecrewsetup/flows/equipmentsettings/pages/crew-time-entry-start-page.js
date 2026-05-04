define([], () => {
  'use strict';

  class PageModule {
    getsysdate() {
      let mydate = new Date();
      return mydate;
    };

    removeDuplicates(values) {

      const seen = new Set();
      return values.filter(item => {
        if (seen.has(item.p_equipment_name)) {
          return false;
        } else {
          seen.add(item.p_equipment_name);
          return true;
        }
      });
    }

    removeDuplicates_TrxSrcName(values) {

      const seen = new Set();
      return values.filter(item => {
        if (seen.has(item.name)) {
          return false;
        } else {
          seen.add(item.name);
          return true;
        }
      });
    }
    removeDuplicateseqpnamedropdown(values) {
  const seen = new Set();

  return values.filter(item => {
    if (seen.has(item.equipment_name)){
     return false;
    } else{
    seen.add(item.equipment_name);
    return true;
  }
  });
}

    updatePayload(item, user) {
      let payload = {
        "p_template_eqp_id": item.template_eqp_id || "",
        "p_template_id": item.template_id || "",
        "p_equipment_id": item.equipment_id || "",
        "p_equipment_number": item.equipment_number || "",
        "p_equipment_name": item.equipment_name || "",
        "p_eqp_serial_number": item.eqp_serial_number || "",
        "p_equipment_class": item.equipment_class || "",
        "p_equip_req_quantity": Number(item.equip_req_quantity) || "",
        "p_total_capacity_perday": Number(item.total_capacity_perday) || "",
        "p_utilization": item.utilization === undefined || item.utilization === null ? null : String(item.utilization),
        "p_notes": item.notes || null,
        "p_last_updated_by": user
      };
      return payload;
    }

    updatelinesPayload(data, user) {
      let payload = {
        "p_equipment_id": data.equipment_id,
        "p_equipment_number": data.equipment_number,
        "p_equipment_name": data.equipment_name,
        "p_equipment_class": data.equipment_class,
        "p_eqp_serial_number": data.eqp_serial_number,
        "p_equip_req_quantity": data.equip_req_quantity,
        "p_total_capacity_perday": data.total_capacity_perday,
        "p_utilization": this.getUtilization(data.total_capacity_perday),
        "p_notes": data.notes,
        "p_last_updated_by": user
      };
      return payload;
    }

    formatDateToDDMMYYYY(dateVal) {
      if (!dateVal) return '';
      const date = new Date(dateVal);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }

    // getUtilization(hrs) {
    //   if(hrs){
    //   const fullDayHours = 24;

    //   if (hrs === null || hrs === "" || hrs === undefined) return "0%";

    //   const parsedHrs = Number(hrs);
    //   if (isNaN(parsedHrs) || parsedHrs < 0) return "0%";

    //   const utilization = (parsedHrs / fullDayHours) * 100;
    //   return `${utilization}%`; // 24 -> "100%"
    //   }
    // }

    // getUtilization(hrs) {
    //   if (hrs) {
    //     const fullDayHours = 24;

    //     if (hrs === null || hrs === "" || hrs === undefined) return "0%";

    //     const parsedHrs = Number(hrs);
    //     if (isNaN(parsedHrs) || parsedHrs < 0) return "0%";

    //     const utilization = (parsedHrs / fullDayHours) * 100;

    //     const formatted = utilization
    //       .toFixed(2)
    //       .replace(/\.?0+$/, "");

    //     return `${formatted}%`;
    //   }
    // }

    getUtilization(hrs) {
      const fullDayHours = 24;

      if (hrs === null || hrs === "" || hrs === undefined) return 0;

      const parsedHrs = Number(hrs);
      if (isNaN(parsedHrs) || parsedHrs < 0) return 0;

      const utilization = parsedHrs / fullDayHours;
      return utilization; // returns 1 for 100%
    }



    formatDateToDDMMMYYYY(isoDateString) {
      if (!isoDateString) return null;

      const date = new Date(isoDateString);

      const day = String(date.getDate()).padStart(2, '0');

      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      const month = monthNames[date.getMonth()];

      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }


    getpayloadfields(data) {
      let payload = {
        // p_template_id: data.p_template_id ,
        p_template_name: data.p_template_name,
        p_template_description: data.p_template_description,
        p_template_code: data.p_template_code,
        p_status: data.p_status,

        p_start_date: data.p_start_date
          ? this.formatDateToDDMMMYYYY(data.p_start_date)
          : null,

        p_end_date: data.p_end_date
          ? this.formatDateToDDMMMYYYY(data.p_end_date)
          : null,

        p_created_by: data.p_created_by || null,
        p_last_updated_by: data.p_last_updated_by || null
      };

      return payload;
    }

    getPayload2(data) {
      let payload = {
        "template_eqp_id": data.template_eqp_id,
        "template_id": data.template_id,
        "equipment_id": data.equipment_id,
        "equipment_number": data.equipment_number,
        "equipment_name": data.equipment_name,
        "eqp_serial_number": data.eqp_serial_number,
        "equip_req_quantity": data.equip_req_quantity,
        "total_capacity_perday": data.total_capacity_perday,
        "utilization": data.utilization,
        "notes": "Updated via API",
        "last_updated_by": "username"
      };
      return payload;
    }

    formatDate(dateStr) {
      if (!dateStr) return '';

      const date = new Date(dateStr);

      const day = String(date.getDate()).padStart(2, '0');

      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }










    formatDateDDMMMYYYY(dateValue) {
      if (!dateValue) return '';
      const d = new Date(dateValue);
      const day = String(d.getDate()).padStart(2, '0');
      const month = d.toLocaleString('en-GB', { month: 'short' });
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    }

    formatDateToDDMMMYYYYY(dateVal) {
      if (!dateVal) {
        return '';
      }

      const dateObj = new Date(dateVal);

      const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      };

      // Example output: 23-Dec-2025
      return dateObj.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    }




    dateformatter(date) {
      return new Date(date).toISOString().split('T')[0];
    }

    uniqueexp(mydata) {
      let data = JSON.parse(JSON.stringify(mydata));
      const seen = new Set();
      const unique = [];
      for (const item of data) {
        if (!seen.has(item.name)) {
          seen.add(item.name);
          unique.push(item);
        }
      }
      return unique;
    }

    updatesettings(data) {
      let payload = {
        "p_org_id": data.org_id,
        "p_business_unit": data.business_unit,
        "p_costing": data.costing,
        "p_id": data.id,
        "p_week_end_day": data.week_end_day,
        "p_eqp_exp_org_id": data.eqp_exp_org_id,
        "p_equipment_owning_organization": data.equipment_owning_organization,
        "p_trx_source_id": data.trx_source_id,
        "p_project_transaction_source": data.project_transaction_source,
        "p_expenditure_batch_prefix": data.expenditure_batch_prefix,
        "p_include_depreciation_cost": "",
        "p_enable_adhoc_timesheet": data.enable_adhoc_timesheet,
        "p_project_transaction_document": data.document_name,
        "p_project_tran_doc_entry": data.document_entry_name
      };
      return payload;
    }

    transformClassSettingsData(items) {
      let array = items.map(item => ({
        class_settings_id: Number(item.class_settings_id),
        created_by: item.created_by,
        equipment_class: item.equipment_class,
        equipment_sub_class: item.equipment_sub_class,
        inspection_site_check_in: item.inspection_site_check_in === 'Y' ? true : false,
        inspection_yard_check_in: item.inspection_yard_check_in === 'Y' ? true : false,
        inspection_yard_check_out: item.inspection_yard_check_out === 'Y' ? true : false
      }));

      return array;
    }

    dataprovider(data) {
      console.log(data);
    }


    insertIotData(iot, user) {

      let payload = {
        "p_iot_number": iot.iot_number,
        "p_iot_device_name": iot.iot_device_name,
        "p_coordinate1": iot.coordinate1,
        "p_coordinate2": iot.coordinate2,
        "p_coordinate3": iot.coordinate3,
        "p_coordinate4": iot.coordinate4,
        "p_coordinate5": iot.coordinate5,
        "p_coordinate6": iot.coordinate6,
        "p_coordinate7": iot.coordinate7,
        "p_coordinate8": iot.coordinate8,
        "created_date": null,
        "p_created_by": user,
        "last_updated_date": null,
        "p_last_updated_by": user
      };
      return payload;

    }

    saveMiscData(data, user, date) {
      let payload = {
        "p_org_id": data.buID,
        "p_business_unit": data.buName,
        "p_costing": data.costing,
        "p_week_end_day": data.weekEndDay,
        "p_eqp_exp_org_id": data.orgID,
        "p_equipment_owning_organization": data.orgName,
        "p_trx_source_id": data.txnSourceId,
        "p_project_transaction_source": data.trxname,
        "p_project_transaction_document": data.document_name,
        "p_project_tran_doc_entry": data.document_entry_name,
        "p_expenditure_batch_prefix": data.expBatchPrefix,
        "p_include_depreciation_cost": "",
        "p_enable_adhoc_timesheet": "",
        "p_created_by": user,
        "p_created_date": ""
      };
      return payload;
    }





    savechecklistdata(data, id) {

      let payload = {
        "p_equipment_class": data.equipment_class,
        "p_equipment_id": data.equipment_id,
        "p_equipment_number": data.equipment_number,
        "p_equipment_name": data.equipment_name,
        "p_section": data.section,
        "p_equipment_sub_class": data.eqp_SubClass,
        "p_check_list_name": data.check_list_name,
        "p_created_by": id,
        "p_inspection_value": data.inspection_value,
        "p_last_updated_by": id
      };
      return payload;
    }
    // removeDuplicates(values) {
    //   // debugger;
    //   const seen = new Set();
    //   return values.filter(item => {
    //     if (seen.has(item.equipment_name)) {
    //       return false;
    //     } else {
    //       seen.add(item.equipment_name);
    //       return true;
    //     }
    //   });
    // }
    editRowMarker(original, newrec) {
      return original === newrec;
    };

    batchupdateJson(data) {
      let finalPayload = data.map(obj => {
        delete obj.isRowEdited;
        return obj;
      })
      return finalPayload;
    };

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
              return obj.time_entry_id === obj2;
            });
          });
        }
        else {
          filteredData = data.filter(function (obj) {
            return selectedKeys.some(function (obj2) {
              return obj.time_entry_id === obj2;
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
              return obj.crewsetup_line_id === obj2;
            });
          });
        }
        else {
          filteredData = data.filter(function (obj) {
            return selectedKeys.some(function (obj2) {
              return obj.crewsetup_line_id === obj2;
            });
          });
        }
      }

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
        "action": "ADD",
        "assignment_number": data.assignment_number,
        "bill_rate": data.bill_rate,
        "crew_week": specific === "WEEK" ? daterange : "",
        "crew_date": specific === "DAY" ? crewDate : "",
        "crewsetup_line_id": data.crewsetup_line_id,
        "equipment_category": data.equipment_category,
        "equipment_rate": data.equipment_rate,
        "fri_in_time": data.fri_in_time,
        "fri_out_time": data.fri_out_time,
        "mon_out_time": data.mon_out_time,
        "mon_in_time": data.mon_in_time,
        "ot_rate": data.ot_rate,
        "pay_rate": data.pay_rate,
        "resource_name": data.resource_name,
        "resource_role": data.resource_role,
        "resource_type": data.resource_type,
        "sat_in_time": data.sat_in_time,
        "sat_out_time": data.sat_out_time,
        "sun_in_time": data.sun_in_time,
        "sun_out_time": data.sun_out_time,
        "thu_in_time": data.thu_in_time,
        "thu_out_time": data.thu_out_time,
        "time_entry_mode": "CREATE",
        "total_hours": data.total_hours,
        "tue_in_time": data.tue_in_time,
        "tue_out_time": data.tue_out_time,
        "wed_in_time": data.wed_in_time,
        "wed_out_time": data.wed_out_time,
        "crewsetup_id": data.crewsetup_id,
        "person_id": data.resource_number,
        "po": data.po,
        "po_line": data.po_line,
        "project_id": data.project_id,
        "project_number": data.project_number,
        "project_name": data.project_name,
        "start_time": "",
        "status": "SUBMITTED",
        "stop_time": "",
        "task_id": data.task_id,
        "uom": "Hours",
        "week_end_date": endDate,
        "work_location": data.resource_location,
        "work_schedule": "REGULAR",
        "contract_id": data.contract_id,
        "created_by": user,
        "customer_id": data.customer_id,
        "fri_total_hours": data.fri_total_hours,
        "mon_total_hours": data.mon_total_hours,
        "sat_total_hours": data.sat_total_hours,
        "sun_total_hours": data.sun_total_hours,
        "thu_total_hours": data.thu_total_hours,
        "tue_total_hours": data.tue_total_hours,
        "wed_total_hours": data.wed_total_hours,
        "time_keeper_id": data.primary_timekeeper_id,
        "supervisor_id": data.supervisor,
        "secondary_timekeeper_id": data.secondary_timekeeper_id,
        "last_updated_by": user,
        "last_updated_date": creationDate,
        "week_start_date": startdate,
        "creation_date": creationDate,
        "timesheet_week_id": weekid
      }
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
    createSystemReq(arg1) {
      let resp = {
        "p_business_unit": arg1.businessUnit,
        "p_costing": arg1.costingVal,
        "p_project_type": arg1.projectTypeVal,
        "p_inventory_type": arg1.inventoryVal,
        "p_timesheet_entry_method": arg1.timeEntryMethodVal
      };
      console.log("test99", resp, arg1);
      return resp;
    }
  }
  PageModule.prototype.settoArray = function (data) {
    if (!(data instanceof Set)) {
      throw new TypeError("Expected a Set as input");
    }
    const stringArray = Array.from(data, String);
    const labels = [
      "All",
      "Project",
      "ProjectDetails",
      "ProjectTaskDetails",
      "ProjectTeamMembers",
      "TimeTypes",
      "PayrollElements",
      "FixedAssetscosts",
      "MaintenanceCostDetails"
    ];
    const labelPresence = labels.reduce((acc, label) => {
      acc[label] = stringArray.includes(label);
      return acc;
    }, {});
    return { array: stringArray, presence: labelPresence };
  };
  return PageModule;
});




