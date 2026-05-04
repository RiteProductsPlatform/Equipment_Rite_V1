define([], () => {
  'use strict';

  class PageModule {
     convertToDateFormate(dateStr) {
      if (dateStr) {
        const date = new Date(dateStr);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const month = monthNames[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
      }
    }
    checkStatus(data){
      if(data){
        let status=[];
        let isDataCorrect= true;
        data.forEach((itm)=>{
          if(status.indexOf(itm.status_code)===-1){
            status.push(itm.status_code);
          }          
        });
        if(status.length >1){
          isDataCorrect = true;
        }
        else{
          if(status.indexOf('APPROVED')===0){
            isDataCorrect= false;
          }
        }
      };
    }
    createAgrLines(data, agrid) {
      let payload = {
        "p_line_id": "",
        "p_agreement_id": agrid || "",
        "p_line_number": "",
        "p_equipment_id": data.eqp_id || "",
        "p_equipment_class": data.eqp_class || "",
        "p_equipment_number": data.eqp_number || "",
        "p_equipment_name": data.eqp_name || "",
        "p_equipment_type": "",
        "p_quantity": data.quantity || "",
        "p_rate_basis": data.rate_basis || "",
        "p_rental_type_code": data.rental_type || "",
        "p_rate_amount": data.rate_amount || "",
        "p_currency": data.currency || "",
        // "p_valid_from": this.formatDate(data.valid_from) || "",
        // "p_valid_to": this.formatDate(data.valid_to) || "",
        "p_status_code": "DRAFT",
        "p_comments": data.notes || "",
        "p_project_name": data.projectname || "",
        "p_project_number": data.projectnumber || "",
        "p_project_id": data.projectid || "",
        "p_project_name_number": data.prjnamenumber || "",
        "p_task_number": data.tasknumber || "",
        "p_task_name": data.taskname || "",
        "p_task_id": data.taskid
      };
      return payload;
    }
  }
  return PageModule;
});
