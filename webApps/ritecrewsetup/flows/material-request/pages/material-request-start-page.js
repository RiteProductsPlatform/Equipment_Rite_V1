define([], () => {
  'use strict';

  class PageModule {

    dateformat() {
      let date = new Date().toISOString();
      return new Date(date).toISOString().split('T')[0];
    }

    createpayloadGenerator(row) {
      let obj = {
        "OrganizationName": row.organization_name,
        "ItemNumber": row.item_number,
        "TransactionTypeName": "Project Material  Issue",
        "TransactionQuantity": row.quantity,
        "TransactionUnitOfMeasure": "Ea",
        "TransactionDate": this.dateformat,
        "SubinventoryCode": row.sub_inventory,
        "AccountCombination": "5002.000.000.1000.60540.P0000.5001.5002.0000",
        "UseCurrentCostFlag": "Y",
        "TransactionMode": "2",
        "SourceCode": "201",
        "SourceLineId": "201",
        "SourceHeaderId": "201",
        "projectCostingDFFs": [
          {
            "__FLEX_Context": "INV_Misc_Transactions",
            "__FLEX_Context_DisplayValue": "INV: Misc. Transactions",
            "_PROJECT_ID_Display": row.project_number,
            "_TASK_ID_Display": row.task_id,
            "_EXPENDITURE_ITEM_DATE": this.dateformat,
            "_EXPENDITURE_TYPE_ID_Display": "1003 - Engineering Services OT",
            "_ORGANIZATION_ID_Display": row.organization_id
          }
        ]
      }
      return obj;
    }
  }

  return PageModule;
});
