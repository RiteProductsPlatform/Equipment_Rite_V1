define([], () => {
  'use strict';

  class PageModule {

    getISODate(date) {
      return new Date(date);
    }

    dayValuesDefault(startDate, endDate) {
      let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let start = new Date(startDate);
      let end = new Date(endDate);

      let myobj = {
        startDay: dayNames[start.getDay()],
        endDay: dayNames[end.getDay()]
      };
      return myobj;
    }

    getDaysOfWeek(startDay, endDay) {
      const daysOfWeek = {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
      };

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const startIndex = days.indexOf(startDay);
      const endIndex = days.indexOf(endDay);

      for (let i = startIndex; i <= endIndex; i++) {
        daysOfWeek[days[i]] = true;
      }

      return daysOfWeek;
    }


    dateFormatter(startdate, enddate, headStart, headEnd) {
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date(startdate);
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate()
      const t2 = new Date(enddate);
      let t2Date = t2.getDate() >= 10 ? t2.getDate() : "0" + t2.getDate()
      let start_date = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let end_date = t2Date + '-' + monthNames[t2.getMonth()] + '-' + t2.getFullYear();
      let sysdate = new Date();
      let t3Date = sysdate.getDate() > 10 ? sysdate.getDate() : "0" + sysdate.getDate()
      let currentdate = t3Date + '-' + monthNames[sysdate.getMonth()] + '-' + sysdate.getFullYear();

      const h1 = new Date(startdate);
      let h1Date = h1.getDate() >= 10 ? h1.getDate() : "0" + h1.getDate()
      const h2 = new Date(enddate);
      let h2Date = h2.getDate() >= 10 ? h2.getDate() : "0" + h2.getDate()
      let h_start_date = h1Date + '-' + monthNames[h1.getMonth()] + '-' + h1.getFullYear();
      let h_end_date = h2Date + '-' + monthNames[h2.getMonth()] + '-' + h2.getFullYear();
      return { "startDate": start_date, "endDate": end_date, "sysdate": currentdate, "hstart": h_start_date, "hend": h_end_date };

    }


    effectiveDate(date) {
      const currentDate = new Date(date);
      currentDate.setDate(currentDate.getDate());
      const isoString = currentDate.toISOString();
      let mydate = isoString.substring(0, 10);
      return mydate;
    }


    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    createEquipLinesReq(arg1, arg2, arg3) {
      let resp = {
        "p_crewsetup_id": arg2.crewsetup_id,
        "p_equipment_name": arg1.resource_name,
        "p_expenditure_type": arg1.expenditure_type_name,
        "p_unit_of_measure": arg1.measure_of_units,
        "p_rate": arg1.bill_rate,
        "p_project_number": arg1.project_number,
        "p_task_name": arg1.task_name,
        "p_effective_start_date": arg1.effective_start_date_copy + "T00:00:00Z",
        "p_effective_end_date": arg1.effective_end_date_copy + "T00:00:00Z",
        "p_mon_quantity": arg1.mon_quantity,
        "p_tue_quantity": arg1.tue_quantity,
        "p_wed_quantity": arg1.wed_quantity,
        "p_thu_quantity": arg1.thu_quantity,
        "p_fri_quantity": arg1.fri_quantity,
        "p_start_date": arg2.start_date,
        "p_end_date": arg2.end_date,
        "p_contract_id": arg2.contract_id,
        "p_project_id": arg1.project_id,
        "p_equipment_id": arg1.resource_id,
        "p_task_id": arg1.task_id,
        "p_customer_id": arg2.customer_id,
        "p_hours_type": arg3,
        "p_approval_required": arg1.p_approval_required
      };
      return resp;

    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    crewTypeCheck(items) {
      let obj = {};
       obj.resFlag = false;
       obj.perFlag = false;
      items.forEach(element => {
        if (element.crew_type === "PERSON") {
          obj.perFlag = true;
        } else if (element.crew_type === "EQUIPMENT") {
          obj.resFlag = true;
        } else if (element.crew_type === "BOTH") {
          obj.resFlag = true;
          obj.perFlag = true;
        }
      });
      console.log("typeFlag", obj);
      return obj;
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    createReqforPackage(arg1) {
      let resp = {
        "crew_setup_id" : arg1
      };
      return resp;
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    printConsole(arg1) {
      console.log("selectedItems",arg1);
    }
  }

  return PageModule;
});
