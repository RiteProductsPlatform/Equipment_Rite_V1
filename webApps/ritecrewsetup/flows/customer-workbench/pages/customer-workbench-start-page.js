define([], () => {
  'use strict';
  class PageModule {


    // date conversion function 22-04-2-26
    formatDate(dateStr) {
      const [year, month, day] = dateStr.split("-");
      return `${day}-${month}-${year}`;
    }

    // date function end
    createRentalContract(header, lines, name, billings) {
      let payload = {
        "Cognomen": name,
        "ContractNumber": name,
        "LegalEntityName": "Oak RealEstate",
        "OrgId": 300000301911646,
        "PrimaryPartyId": 300001765935338,
        "ContractTypeId": 300001765952731,
        "InvOrgName": "OAK_ITEM_MASTER",
        "OrgName": "Oak USA BU1",
        "ContractTypeName": "Equipment Rental ContracT Type",
        "PartyName": "Tulsa Engineering",
        "StartDate": this.convertDateFormat(header.start_date),
        "EndDate": this.convertDateFormat(header.end_date),
        "CurrencyCode": "USD",
        "OwningOrgName": "OAK PPM",
        "ContributionPercent": 1,
        "InvTrxTypeName": "PA Invoice",
        "ContractHeaderFlexfieldVA": [
          {
            "referenceNumber": header.rental_reservation_number,
            "__FLEX_Context": null
          }
        ],
        "ContractLine": lines.map((line, i) => ({
          "LineNumber": i + 1,
          "LineTypeId": 300000000099381,
          "LineTypeName": "Free-form, project",
          "ItemNameTxt": line.equipment_name,
          "ItemDescription": line.equipment_name + line.equipment_number,
          "StartDate": this.convertDateFormat(header.start_date),
          "EndDate": this.convertDateFormat(header.end_date),
          "ShipToAccountNumber": "143160",
          "ShipToSite": "172335",
          "LineStatus": "Active",
          "EstimatedVariableConsiderationAmount": 0,
          "StandaloneSellingPrice": 0,
          "LineValueAmount": line.quote_amount,
          "ContractPuid": null,
          "ContractAllLineDesFlexVA": [
            {
              "numberOfBillings": billings
            }
          ]
        })),
        "BillPlan": [
          {
            "BillMethodId": 300001765935565,
            "BillMethodName": "lein recurring",
            "BillPlanName": "Equipment Rental Bill Plan",
            "BillingCurrencyType": "Contract",
            "PaymentTerms": "IMMEDIATE",
            "BillSetNumber": 1,
            "BillToAccountNumber": "143160",
            "BillToSite": "172334",
            "BillingCycleId": 2,
            "BillingCycle": "Daily",
            "LaborInvoiceFormat": "OAK_LABOUR",
            "NonlaborInvoiceFormat": "OAK_NON_LABOUR",
            "EventInvoiceFormat": "OAK_EVENT_BASED"
          }
        ],
        "RevenuePlan": [
          {
            "BillPlanName": "ER1001_Revenue_Plan",
            "BillMethodId": 300000047569111,
            "BillMethodName": "Amount Based"
          }
        ]
      };
      return payload;
    }
    updateRentalContract(contractId, lines) {
      let object = {
        "ContractId": contractId,
        "ContractLine": lines.map((line, i) => ({
          "LineNumber": line.LineNumber,
          "LineId": line.LineId,
          "BillPlan": "Equipment Rental Bill Plan",
          "RevenuePlan": "ER1001_Revenue_Plan"
        })),
      };
      return object;
    }
    getCurrentISODateTime() {
      const now = new Date();
      return now.toISOString();
    }
    getCurrentTimestamp() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    convertDateFormat(dateStr) {
      const [month, day, year] = dateStr.split("/");
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    calculateDaysBetweenUSFormat(startDateStr, endDateStr) {
      function convertToISO(dateStr) {
        const [month, day, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      const startDate = new Date(convertToISO(startDateStr));
      const endDate = new Date(convertToISO(endDateStr));
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
  }
  return PageModule;
});
