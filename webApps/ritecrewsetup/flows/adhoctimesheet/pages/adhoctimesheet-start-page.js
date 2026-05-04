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

    sysdate() {
      return new Date().toISOString();
    }

    uniqueTaskObj(mydata) {
      let data = JSON.parse(JSON.stringify(mydata)); // Deep copy

      const uniqueMap = new Map();

      data.forEach(item => {
        if (!uniqueMap.has(item.TaskName)) {
          item.displayText = `${item.TaskNumber} - ${item.TaskName}`;
          uniqueMap.set(item.TaskName, item);
        }
      });

      return Array.from(uniqueMap.values());
    }


    formatDate(mydate) {
      let date = new Date(mydate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
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
        "p_expenditure_organization": data.expenditure_type,
        "p_work_type": null,
        "p_nonlabor_resource": data.non_labor_resource,
        "p_non_labor_resource_organization": data.non_labor_resource_organization,
        "p_organization_id": data.organization_id,
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
        "upload_filetype": data.upload_filetype

      };

      return obj;
    }


    adpgenerator(myeqpdata, headerobj, user, mytaskdata) {
      let eqpdata = JSON.parse(myeqpdata);
      let taskdata = JSON.parse(mytaskdata);
      let finalArr = [];

      eqpdata.forEach((ele, index) => {
        let objTemp = {
          "batch_id": index + 1,
          "business_unit": null,
          "crewsetup_eqp_header_id": null,
          "crewsetup_id": headerobj.crewid,
          "entry_date": this.formatDate(headerobj.date),
          "eqp_request_number": null,
          "equipment_id": ele.equipment_id,
          "equipment_name": ele.equipment_name,
          "equipment_number": ele.equipment_number,
          "equipment_resource_class": headerobj.eqpclass,
          "expenditure_batch": "Batch-" + (index + 1),
          "last_update_login": user,
          "last_updated_by": user,
          "nonlabor_resource": headerobj.nonlabourresource,
          "nonlabor_resource_organization": headerobj.org,
          "project_id": headerobj.projectId,
          "project_name": headerobj.projectName,
          "project_number": headerobj.projectNumber,
          "quantity": headerobj.quantity,
          "secondary_timekeeper_id": null,
          "supervisor_id": null,
          "time_keeper_id": user,
          "hour_type": headerobj.hourtype,
          "cost": headerobj.cost,
          "installed_qty": ""
        };

        // Dynamically add task fields for each task in taskdata
        taskdata.forEach((task, taskIndex) => {
          objTemp[`task_id_${taskIndex + 1}`] = task.id;
          objTemp[`task_name_${taskIndex + 1}`] = task.name;
          objTemp[`task_number_${taskIndex + 1}`] = task.number;
          objTemp[`task_hours_${taskIndex + 1}`] = task.hours;
        });

        finalArr.push(objTemp);
      });
      // Sort finalArr based on batch_id in descending order (use .sort() for ascending)
      finalArr.sort((a, b) => b.batch_id - a.batch_id);
      return finalArr;
    }


    filterData(selected, mydata, selectedKeys) {
      let data = JSON.parse(mydata);
      var keys = [];
      var filteredData = [];
      if (selected.row.isAddAll()) {
        var iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        filteredData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.batch_id == obj2;
          });
        });
      }
      else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.batch_id == obj2;
          });
        });
      }
      return filteredData;
    };

    columnsGenerator(headerParams, mytaskdata) {
      let taskdata = JSON.parse(mytaskdata);
      let array = [
        {
          "headerText": "",
          "field": "",
          "template": "copyicon",
          "sortable": "disabled"
        },
        {
          "headerText": "Date",
          "field": "entry_date",
          "template": "entry_date"
        },
        {
          "headerText": "Business Unit",
          "field": "business_unit"
        },
        {
          "headerText": "Equipment Name",
          "field": "equipment_name",
          "template": "equipment_name"
        },
        {
          "headerText": "Equipment Number",
          "field": "equipment_number"
        },
        {
          "headerText": "Hour Type",
          "field": "hour_type"
        },
        {
          "headerText": "Cost",
          "field": "cost"
        },
        {
          "headerText": "Nonlabor Resource Org",
          "field": "nonlabor_resource_organization"
        },
        {
          "headerText": "Equipment Resource Class",
          "field": "equipment_resource_class"
        },
        {
          "headerText": "Nonlabor Resource",
          "field": "nonlabor_resource"
        },
        {
          "headerText": "Project Name",
          "field": "project_name"
        }
        ,
        {
          "headerText": "Installed Quantity",
          "field": "installed_qty", "className": "oj-helper-text-align-end"
        }
      ];
      taskdata.forEach((task, index) => {
        array.push({
          "headerText": task.name,
          "field": `task_hours_${index + 1}`, "className": "oj-helper-text-align-end",
          "template": `Task#${index + 1}`
        });
      });

      return array;
    }


    setBatchIdDesc(mydata) {
      let data = JSON.parse(mydata);
      data.sort((a, b) => b.batch_id - a.batch_id);
      return data;

    }

  }

  return PageModule;
});
