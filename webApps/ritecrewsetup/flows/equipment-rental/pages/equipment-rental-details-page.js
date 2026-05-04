define([], () => {
  'use strict';

  class PageModule {

    cartAddition(mycurrent, myarray) {
      let current = JSON.parse(mycurrent);
      let array = JSON.parse(myarray);
      const exists = array.some(item => item.equipment_id === current.equipment_id);
      if (!exists) {
        array.push(current);
      }

      return array;
    }

    removefromCart(mycurrent, myarray) {
      let current = JSON.parse(mycurrent);
      let array = JSON.parse(myarray);
      let finalarray = [];
      for (let i = 0; i < array.length; i++) {
        if (current.equipment_id !== array[i].equipment_id) {
          finalarray.push(array[i]);
        }
      }
      return finalarray;
    }

    calculateWeeklyAndMonthly(mydollarsPerDay) {
      let dollarsPerDay = Number(mydollarsPerDay)
      const daysInWeek = 7;
      const averageDaysInMonth = 30.44; // average over a year

      const dollarsPerWeek = Math.round(dollarsPerDay * daysInWeek);
      const dollarsPerMonth = Math.round(dollarsPerDay * averageDaysInMonth);

      return {
        perWeek: Number(dollarsPerWeek.toFixed(2)),
        perMonth: Number(dollarsPerMonth.toFixed(2))
      };
    }

    uniqueBuNames(mydata) {
      let data = JSON.parse(mydata);

      // Create a Map to store unique business_unit_name by business_unit_id
      const uniqueMap = new Map();

      data.forEach(item => {
        if (!uniqueMap.has(item.business_unit_id)) {
          uniqueMap.set(item.business_unit_id, {
            business_unit_id: item.business_unit_id,
            business_unit_name: item.business_unit_name
          });
        }
      });

      // Return the values as an array
      return Array.from(uniqueMap.values());
    }

    uniqueItemNames(mydata) {
      let data = JSON.parse(mydata);

      const uniqueMap = new Map();

      data.forEach(item => {
        if (!uniqueMap.has(item.item_number)) {
          uniqueMap.set(item.item_number, item);
        }
      });

      // Return array of unique items
      return Array.from(uniqueMap.values());
    }

    uniquepersonNames(mydata) {
      let data = JSON.parse(mydata);
      const uniqueMap = new Map();
      data.forEach(item => {
        if (!uniqueMap.has(item.person_name)) {
          uniqueMap.set(item.person_name, item);
        }
      });
      // Return array of unique items
      return Array.from(uniqueMap.values());
    }

    payloadGenerator(mydata) {
      let data = JSON.parse(mydata);
      let obj = {
        "RequisitioningBU": data.bu,
        "PreparerId": data.preparer_id,
        "ExternallyManagedFlag": "false",
        "lines": [
          {
            "LineNumber": 1,
            "LineTypeCode": data.lineType,
            "CategoryName": data.itemcategory,
            "ItemDescription": data.item_description,
            "Item": data.item_number,
            "Quantity": data.quantity,
            "Price": data.price,
            "CurrencyCode": data.CurrencyCode,
            "UOM": data.uom,
            "RequesterId": data.requestor_id,
            "DestinationType": "Expense",
            "DestinationOrganizationId": data.orgid,
            "DeliverToLocationCode": data.orgName,
            "NegotiatedByPreparerFlag": "true",
            "RequestedDeliveryDate": "2025-05-29T00:00:00Z",
            "distributions": [
              {
                "Quantity": data.quantity,
                "DistributionNumber": 1,
              }
            ]
          }
        ]
      }

      return obj;

    }

  }

  return PageModule;
});
