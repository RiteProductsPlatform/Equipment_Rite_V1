define([], () => {
  'use strict';

  class PageModule {
  }
  PageModule.prototype.convertBase64 = function (file) {
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
  };

  PageModule.prototype.defaultBulk = function (data) {
    if (data) {
      debugger;
      let defaultpayload = {
        "requestor_name": data.requestor_name,
        "request_type": data.request_type,
        "city": data.city,
        "country": data.country,
        "equipment_class": "BULK ITEMS",
        "equipment_id": "",
        "equipment_name": "",
        "equipment_number": "",
        "latitude": "",
        "location": "",
        "longitude": "",
        "project_id": data.project_id,
        "project_name": data.project_name,
        "project_number": data.project_number,
        "schedule_cost_rate": data.schedule_cost_rate,
        "task_id": data.task_id,
        "task_name": data.task_name,
        "task_number": data.task_number,
        "addressline1": "",
        "addressline2": "",
        "crew_id": data.crew_id,
        "crew_name": data.crew_name,
        "efforts_per_day": data.efforts_per_day,
        "rate_basis": data.rate_basis,
        "start_date": data.start_date,
        "end_date": data.end_date,
        "utilization": data.utilization,
        "zipcode": ""

      };
      return defaultpayload;
    }

  };
  PageModule.prototype.convertPercentage = function (data) {
    if(data){
      return (data * 100) + "%";
    }
  };
  
  return PageModule;
});
