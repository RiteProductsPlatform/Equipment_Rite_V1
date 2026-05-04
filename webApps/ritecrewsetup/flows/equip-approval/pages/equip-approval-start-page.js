define([], () => {
  'use strict';

  class PageModule {
    myset(value) {
      const arrayOfStrings = Array.from(value).map(item => String(item));
      return arrayOfStrings;
    }
    getUtilization(hrs) {
      const fullDayHours = 24;

      if (hrs === null || hrs === "" || hrs === undefined) return 0;

      const parsedHrs = Number(hrs);
      if (isNaN(parsedHrs) || parsedHrs < 0) return 0;

      const utilization = parsedHrs / fullDayHours;
      return utilization; // returns 1 for 100%
    }
    posaveobj(data) {
      let payload = {
        "p_purchase_order": data.ponumber,
        "p_po_hdr_id": data.pohdrId,
        "p_po_line_number": data.poline,
        "p_recept_number": data.receipt,
        "p_po_cost": data.pocost,
        "p_po_receiving_org": data.org
      }
      return payload;
    }
    transformDate(input) {
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
      if (!isoRegex.test(input)) {
        return input;
      }
      return input.split('T')[0];
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

    getdate() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0"); // 2-digit day
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[now.getMonth()]; // month name
      const year = now.getFullYear();

      return `${day}-${month}-${year}`;
    }

    formatReservseDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(today.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
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
    createMasterPayload(data, rowdata, podetails) {
      let resp11 = {
        "p_equipment_number": data.equipment_number || "",
        "p_equipment_name": data.equipment_name || "",
        "p_equipment_description": data.equipment_description || "",
        "p_equipment_type": data.equipment_type || "",
        "p_equipment_class": data.equipment_class || "",
        "p_equipment_sub_class": data.equipment_sub_class || "",
        "p_status": "At Equipment Yard",
        "p_subinventory_code": data.subinventory_code || "",
        "p_subinventory_name": data.subinventory_name || "",
        "p_organization_id": data.organization_id || "",
        "p_organization_name": data.organization_name || "",
        "p_item_organization_name": "",
        "p_item_organization_id": "",
        "p_non_labor_resource": "",
        "p_non_labor_resource_org": "",
        "p_cost_rate": data.cost_rate || "",
        "serial_number": "",
        "location_type": "",
        "location_organization": "",
        "work_center": "",
        "work_area": "",
        "maintenance_asset_number": "",
        "maintenance_asset_id": "",
        "maintenance_asset_name": "",
        "operating_org_id": "",
        "maintenance_organization_id": "",
        "work_center_id": "",
        "maintenance_organization": "",
        "operating_organization": "",

        "p_maintenance_asset_id": "",
        "p_maintenance_asset_number": "",
        "p_maintenance_location_type": "",
        "p_maint_location_organization_id": "",
        "p_work_center_id ": "",
        "p_work_center_code": "",
        "p_work_area_id": "",
        "p_work_area_code": "",

        "p_asset_number": "",
        "p_asset_id": "",
        "p_inventory_item": data.inventory_item || "",
        "p_inventory_item_id": data.inventory_item_id || "",
        "p_purchase_order": podetails.ponumber || "",
        "p_person_number": "",
        "p_project_id": rowdata.project_id || "",
        "p_record_mode": "",
        "p_project_name": rowdata.project_name || "",
        "p_project_number": rowdata.project_number || "",
        "p_task_id": rowdata.task_id || "",
        "p_task_name": rowdata.task_name || "",
        "p_task_number": rowdata.task_number || "",

        "p_ast_date_in_service": "",
        "p_ast_retired_date": "",
        "p_ast_insured_by": "",
        "p_ast_insured_policy": "",
        "p_asset_organization": "",
        "p_asset_org_code": "",
        "p_asset_org_id": "",

        "p_manufacturer": "",
        "p_mf_model_year": "",
        "p_mf_model_number": "",
        "p_mf_color": "",
        "p_mf_license_state": "",
        "p_mf_license_number": "",
        "p_mf_license_expiry": "",
        "p_mf_fuel_type": "",
        "p_mf_serial_number": "",
        "p_mf_weight": "",
        "p_mf_warranty_code": "",

        "p_default_location": rowdata.location || "",
        "p_address_line1": "",
        "p_address_line2": "",
        "p_longitude": "",
        "p_latitude": "",
        "p_city": "",
        "p_state": "",
        "p_zip": "",
        "p_county": "",
        "p_equipment_id": "",
        "p_country": "",

        "p_vendor_name": "",
        "p_vendor_id": "",
        "p_lease_start": "",
        "p_lease_end": "",
        "p_lease_rate": "",

        "p_include_in_pm": "",
        "p_pm_basis": "",

        "p_auto_costing_flag": "",
        "p_expenditure_org_name": "",
        "p_billing_category": "",

        "p_capacity_per_day": "",

        "p_file_name": "",
        "p_file_type": "",
        "p_file_content": "",

        "p_equip_req_quantity": "",
        "p_life_of_equipment": "",

        "p_track_inventory_item": "",
        "p_track_fixed_asset": "",
        "p_track_maint_asset": "",

        "p_expendituretypeid": "",
        "p_expendituretypename": "",
        "p_current_status": "",
        "p_equipment_surplus": ""
      };

      return resp11;

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
