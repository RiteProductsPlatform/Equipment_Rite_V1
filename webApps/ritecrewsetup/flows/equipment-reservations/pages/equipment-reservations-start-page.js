define([], () => {
  'use strict';

  class PageModule {

    extractContractId(mylinks) {
      let links = JSON.parse(mylinks);

      let billPlanLink = links.find(link => link.name === "BillPlan");

      if (billPlanLink && billPlanLink.href) {
        let match = billPlanLink.href.match(/contracts\/(\d+)\/child\/BillPlan/);
        return match ? match[1] : null;
      }
      return null;
    }


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


    checkfilterData(selected, mydata, selectedKeys) {
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
            return obj.check_list_id === obj2;
          });
        });
      }
      else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.check_list_id === obj2;
          });
        });
      }
      return filteredData;
    };

    // crewsetup_eqp_header_id
    filterData(selected, mydata, selectedKeys) {

      let data = JSON.parse(mydata);
      let keys = [];
      let classArray = [];
      let filteredData = [];

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
      } else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.crewsetup_eqp_header_id === obj2;
          });
        });
      }

      // Extract unique equipment_class and push it to classArray in the desired format
      let uniqueClasses = new Set();
      filteredData.forEach(function (item) {
        if (item.equipment_resource_class && !uniqueClasses.has(item.equipment_resource_class)) {
          uniqueClasses.add(item.equipment_resource_class);
          classArray.push({ "equipment_class": item.equipment_resource_class, "id": item.equipment_id });
        }
      });

      return { "data": filteredData, "class": classArray };
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

    converImageBase64(file) {
      return new Promise((resolve) => {
        const blobURL = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          function () {
            // convert image file to base64 string
            resolve({
              data: reader.result,
              url: blobURL,
            });
            // document.getElementById("mypic").onload = function () {
            //   URL.revokeObjectURL(blobURL);
            // };
          },
          false
        );

        if (file) {
          reader.readAsDataURL(file);
        }
      });
    }

    downloadBase64File(base64Data, fileName) {
      const link = document.createElement('a');
      link.href = base64Data;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

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

    //  formatDate(inputDate) {
    // const date = new Date(inputDate);

    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // const year = String(date.getFullYear()).slice(-2);

    // return `${month}/${day}/${year}`;
    // }

    formatDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(today.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    saveDraft(data, current, page, user) {
      let payload = {
        "p_equipment_request_id": current.equipment_request_id,
        "p_project_id": data.projectId,
        "p_project_number": data.projectnumber,
        "p_project_name": data.projectname,
        "p_task_id": data.taskId,
        "p_task_number": data.taskNumber,
        "p_task_name": data.taskName,
        "p_business_unit_id": data.orgId,
        "p_business_unit": data.businessUnitName,
        "p_effective_start_date": this.date(data.effectivestartDate),
        "p_effective_end_date": this.date(data.effectiveEndDate),
        "p_page_name": page,
        "p_action": "REQUEST EDIT",
        "p_last_updated_by": user
      };
      return payload;
    }

    date(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    getbillplanstring(mylinks) {
      let links = JSON.parse(mylinks);
      let mybillstring;
      let myGuidString;

      // Loop through the array of links
      links.forEach(link => {
        // Check if the name is 'NonLaborRateOverride'
        if (link.name === "NonLaborRateOverride") {
          const href = link.href;

          // Extract the string between '/BillPlan/' and '/child'
          const start = href.indexOf("/BillPlan/") + "/BillPlan/".length;
          const end = href.indexOf("/child", start);

          // Get the part after '/BillPlan/' and before '/child'
          const dynamicPart = href.substring(start, end);


          mybillstring = dynamicPart;
        }
      });

      return mybillstring; // Return both values
    }


    getNonLabourstring(mylinks) {
      let links = JSON.parse(mylinks);
      let myGuidString;
      links.forEach(link => {
        if (link.name === "NonLaborRateOverride" && link.rel === "self") {
          const href = link.href;
          const guidStart = href.indexOf("/NonLaborRateOverride/") + "/NonLaborRateOverride/".length;
          const guid = href.substring(guidStart);

          myGuidString = guid;
        }
      });

      return myGuidString;  // Return both values
    }


    updateDefaultCols(defCols, value) {
      let defaultColumns = [];
      if (value === 'Customer') {
        defaultColumns = [

          { "headerText": "Request Number", "field": "eqp_request_number", "className": "oj-helper-text-align-end" },
          { "headerText": "Equipment Name", "field": "equipment_name" },
          { "headerText": "Class", "field": "equipment_resource_class" },
          { "headerText": "Type", "field": "request_type" },
          { "headerText": "Customer", "field": "customer" },
          { "headerText": "Customer Site", "field": "customer_site" },
          { "headerText": "Bill Rate", "field": "bill_rate", "className": "oj-helper-text-align-end" },
          { "headerText": "Cost Rate", "field": "cost_rate", "template": "Cost Rate2", "className": "oj-helper-text-align-end" },
          { "headerText": "Expenditure Type", "field": "expenditure_type" },
          { "headerText": "Effective Start Date", "field": "effective_start_date", "template": "DateTemplate" },
          { "headerText": "Effective End Date", "field": "effective_end_date", "template": "DateTemplate" },
          { "headerText": "Status", "field": "status" },
          { "headerText": "Maintenance", "field": "maintenance", "template": "maintenance" },
          { "headerText": "Accept request", "field": "", "template": "action" },
          { "headerText": "Comments", "field": "", "template": "commentAction" },
          { "headerText": "Action", "field": "", "sortable": "disabled", "template": "upload" }
        ];
      }
      if (value === 'Project') {
        defaultColumns = [

          { "headerText": "Request Number", "field": "eqp_request_number", "className": "oj-helper-text-align-end" },
          { "headerText": "Equipment Name", "field": "equipment_name" },
          { "headerText": "Class", "field": "equipment_resource_class" },
          { "headerText": "Type", "field": "request_type" },
          { "headerText": "Project Number", "field": "project_number" },
          { "headerText": "Project", "field": "project_name" },
          { "headerText": "Task Name", "field": "task_name" },
          { "headerText": "Bill Rate", "field": "bill_rate", "className": "oj-helper-text-align-end" },
          { "headerText": "Cost Rate", "field": "cost_rate", "template": "Cost Rate2", "className": "oj-helper-text-align-end" },
          { "headerText": "Expenditure Type", "field": "expenditure_type" },
          { "headerText": "Effective Start Date", "field": "effective_start_date", "template": "DateTemplate" },
          { "headerText": "Effective End Date", "field": "effective_end_date", "template": "DateTemplate" },
          { "headerText": "Status", "field": "status" }, { "headerText": "Maintenance", "field": "maintenance", "template": "maintenance" },
          { "headerText": "Accept request", "field": "", "template": "action" },
          { "headerText": "Comments", "field": "", "template": "commentAction" },
          { "headerText": "Action", "field": "", "sortable": "disabled", "template": "upload" }
        ];
      }
      return defaultColumns;
    }
  }

  return PageModule;
});
