define([], () => {
  'use strict';

  class PageModule {
    myset(value) {
      const arrayOfStrings = Array.from(value).map(item => String(item));
      return arrayOfStrings;
    }


    formatDate(inputDate) {
      if (inputDate) {
        const date = new Date(inputDate);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }

    }
    getApporvePayload(data) {
      if (data) {
        let payload = {
          "p_action":"APPROVED",
          "p_equipment_class": "",
          "p_equipment_id": "",
          "p_equipment_name": "",
          "p_equip_req_quantity": "",
          "p_total_efforts_perday": "",
          "p_notes": "",
          "p_equipment_request_id":data.equipment_request_id,
          "p_eqp_request_number": data.eqp_request_number
        };
        return payload;
      }
    }
      getApporvePayloadEdit(data,reqobj) {
      if (data) {
        // debugger;
        let payload = {
          "p_action":"EDIT",
          "p_equipment_class":data.equipment_resource_class,
          "p_equipment_id": data.equipment_id,
          "p_equipment_name": reqobj.p_equipment_name,
          "p_equip_req_quantity": reqobj.p_equip_req_quantity,
          "p_total_efforts_perday": reqobj.p_total_efforts_perday,
          "p_notes": reqobj.p_notes,
          "p_eqp_request_number": data.eqp_request_number
        };
        return payload;
      }
    }

    assetObj(request, assetDetails, row, user) {
      let payload = {
        "p_parent_request_number": request.eqp_request_number,
        "p_parent_request_id": request.equipment_request_id,
        "p_child_asset_id": null,
        "p_parent_asset_id": null,
        "p_parent_asset_number": row.maintenance_asset_number,
        "p_child_asset_number": assetDetails.asset_number,
        "p_created_by": user || null,
        "p_last_updated_by": user || null
      };
      return payload;
    };




    downloadBase64File(base64Data, fileName) {
      const link = document.createElement('a');
      link.href = base64Data;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
