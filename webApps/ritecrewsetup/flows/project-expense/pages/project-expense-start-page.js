define([], () => {
  'use strict';

  class PageModule {
    myset(value) {
      const arrayOfStrings = Array.from(value).map(item => String(item));
      return arrayOfStrings;
    }

    unprocessedCost(data, record, batch, doc) {
      // debugger;
      let payload = {
        "ExpenditureBatch": batch,
        "BusinessUnit": data.business_unit,
        "TransactionSource": doc.project_transaction_source,
        "Document": doc.project_transaction_document,
        "DocumentEntry": doc.project_tran_doc_entry,
        "OriginalTransactionReference": batch,
        "Quantity": record.quantity,
        "NonlaborResource": data.non_labor_resource,
        "NonlaborResourceOrganization": null,
        "RawCostInTransactionCurrency": record.rawcost ? record.rawcost : null,
        "TransactionCurrency": "",
        "TransactionCurrencyCode": record.currency,
        "AccountingDate": this.getFormattedDate(),
        "RawCostRateInTransactionCurrency": "",
        "Comment": record.comments,
        "BurdenedCostRateInTransactionCurrency": "",
        "ProjectStandardCostCollectionFlexfields": [
          {
            "_EXPENDITURE_ITEM_DATE": this.getFormattedDate(),
            "_PROJECT_ID_Display": data.project_number,
            "_TASK_ID_Display": data.task_number,
            "_EXPENDITURE_TYPE_ID_Display": record.expenditureType ? record.expenditureType : record.expenditureTypeName1,
            "_ORGANIZATION_ID_Display": record.org || record.org1
          }
        ]
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
    saveProjectExpenseData(data, table, user, flag) {
      let payload = {
        "p_expenditure_type": data.expenditureType ? data.expenditureType : data.expenditureTypeName1,
        "p_expenditure_type_id": data.expenditureTypeId ? data.expenditureTypeId : data.expenditureTypeId1,
        "p_expenditure_item_date": this.getFormattedSysDate(),
        "p_raw_cost": data.rawcost,
        "p_non_labor_resource": data.nonlaborResource,
        "p_non_labor_resource_organization": data.org1 || data.org,
        "p_non_labor_resource_org_id": "",
        "p_quantity": data.quantity,
        "p_raw_cost_enabled": flag,
        "p_currency_code": data.currency,
        "p_project_id": table.project_id,
        "p_project_number": table.project_number,
        "p_project_name": table.project_name,
        "p_task_id": table.task_id,
        "p_task_number": table.task_number,
        "p_task_name": table.task_name,
        "p_business_unit": table.business_unit,
        "p_business_unit_id": table.business_unit_id,
        "p_created_by": user ? user : "",
        "p_last_updated_by": user ? user : "",
        // "p_batch_name": "",
        "p_last_updated_date": this.getFormattedSysDate(),
        "p_creation_date": this.getFormattedSysDate(),
        "p_comments": data.comments
      };
      return payload;
    }

    getFormattedSysDate() {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    getFormattedDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
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

    dateformatter(date) {
      return new Date(date).toISOString().split('T')[0];
    }


    checkfilterData(selected, mydata, selectedKeys) {
      let data = JSON.parse(JSON.stringify(mydata));
      var keys = [];
      var filteredData = [];
      if (selected.row.isAddAll()) {
        var iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        filteredData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.equipment_id === obj2;
          });
        });
      }
      else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.equipment_id === obj2;
          });
        });
      }
      return filteredData;
    };

  }

  return PageModule;
});
