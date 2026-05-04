define([], () => {
  'use strict';

  class PageModule {
    saveRateSchedule(data, start, end) {
      let payload = {
        "bill_rate": data.bill_rate,
        "cost_rate": data.cost_rate,
        "equipment_name": data.equipment_name,
        "currency": data.currency,
        "eqp_rate_row_detail_id": data.eqp_rate_row_detail_id,
        "equipment_resource_class": data.equipment_resource_class,
        "location": data.location,
        "non_labor_resource": data.non_labor_resource,
        "rate_schedule_name": data.rate_schedule_name,
        "rate_type_end_date": end,
        "rate_type_start_date": start,
        "rate_types": data.rate_types,
        "rounding_threshold": data.rounding_threshold,
        "uom": data.uom
      };
      return payload;
    }


     saveRateScheduleDetails(data,id,equpment) {
      debugger;
      let payload = {
        "bill_rate": data.bill_rate,
        "cost_rate": data.cost_rate,
        "equipment_name": equpment.equipment_name,
        "currency": data.currency,
        "eqp_rate_row_id": id,
        "equipment_resource_class": equpment.equipment_resource_class,
        "location": data.location,
        "non_labor_resource": equpment.equipment_name,
        "rate_schedule_name": data.rate_schedule_name,
        "rate_type_end_date": this.formatDate(data.rate_type_end_date),
        "rate_type_start_date": this.formatDate(data.rate_type_start_date),
        "rate_types": data.rate_types,
        "rounding_threshold": data.rounding_threshold,
        "uom": equpment.uom
      };
      return payload;
    }



    formatDate(inputDate) {
      if (inputDate) {
        const date = new Date(inputDate);
        date.setMonth(date.getMonth() + 1);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      return "";
    }





    getUnmatchedFromArr2(arr1, arr2) {
      const normalizeDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      };
      const makeKey = (obj) =>
        `${obj.rate_types}|${normalizeDate(obj.rate_type_start_date)}|${normalizeDate(obj.rate_type_end_date)}`;
      const arr1Keys = new Set(arr1.map((item) => makeKey(item)));
      const unmatchedArr2 = arr2.filter(
        (item) => !arr1Keys.has(makeKey(item))
      );

      return unmatchedArr2.length > 0 ? unmatchedArr2 : false;
    }




  }
  return PageModule;
});
