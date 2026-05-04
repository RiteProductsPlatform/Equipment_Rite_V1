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

    getmatchedRecords(data, parentAssetNumber, assetNumber) {
      if (data, parentAssetNumber, assetNumber) {
        return data.filter(item =>
          item.parent_asset_number === parentAssetNumber && item.asset_number === assetNumber
        );
      }
    }


    getGroupByNewPayload(data) {
      // debugger;
      let section = [];
      let newPayload = [];
      data.forEach((itm, idx) => {
        if (section.length === 0) {
          let obj = {
            "id": idx + 1,
            "section": itm.section,
            "children": [
              {
                "id": idx + 1 + 100,
                "agreed_status": itm.agreed_status,
                "check_list_name": itm.check_list_name
              }
            ]
          };
          newPayload.push(obj);
          section.push(itm.section);
        } else if (section.indexOf(itm.section) === -1) {
          // if (section.indexOf(itm.section) === -1) {
          let obj = {
            "id": idx + 1,
            "section": itm.section,
            "children": [
              {
                "id": idx + 1 + 100,
                "agreed_status": itm.agreed_status,
                "check_list_name": itm.check_list_name
              }
            ]
          };
          newPayload.push(obj);
          section.push(itm.section);
          // }
        } else {
          let index = section.indexOf(itm.section);
          let obj = {
            "id": idx + 1 + 100,
            "agreed_status": itm.agreed_status,
            "check_list_name": itm.check_list_name
          };
          newPayload[index].children.push(obj);
        }
      });
      return newPayload;
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

    postinventoryStaged(rowdata, data) {
      let payload = {
        "SourceCode": 2,
        "ProcessStatus": 1,
        "SourceHeaderId": 2,
        "SourceLineId": 2,
        "UseCurrentCostFlag": "Y",
        "TransactionMode": "2",
        "LockStatus": 2,
        "TransactionTypeName": "Intransit Shipment",
        "OrganizationName": rowdata.organization_name,
        "ItemNumber": rowdata.inventory_item,
        "TransactionQuantity": "-"+data.quantity,
        "TransactionUnitOfMeasure": data.uom,
        "TransactionDate": this.getFormattedDate(),
        "SubinventoryCode": rowdata.subinventory_code,
        "TransferOrganizationName":data.transferOrg,
        "TransferSubinventory": "",
        "ShipmentNumber":  rowdata.eqp_request_number.toString() + rowdata.equipment_request_id.toString()
      };
      return payload;
    }

    getFormattedDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }


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
