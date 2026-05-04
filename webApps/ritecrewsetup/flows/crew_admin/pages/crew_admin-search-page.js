define([], () => {
  'use strict';

  class PageModule {

    getDateFormate(data) {
      if (data) {
        return data.split('T')[0];
      }
    }

    addUniqId(data) {
      let uniqIdResult = [];
      if (data) {
        data.forEach((item, idex) => {
          item.uid = idex + 1;
          uniqIdResult.push(item);
        });
        return uniqIdResult;
      }
    }

    convertSetToArray(mySet) {
      return Array.from(mySet);
    }

    getUnmatchedRecords(response, arrayVar) {
      const varNames = new Set(arrayVar.map(item => item.name));
      return response.filter(item => !varNames.has(item.name));
    }

    updatepayload(data, user) {
      let payload = {
        "p_equipment_number": data.equipment_number,
        "p_equipment_description": data.equipment_description,
        "p_equipment_type": data.equipment_type,
        "p_equipment_class": data.equipment_class,
        // "p_equipment_id":data.equipment_id,
        "p_equipment_sub_class": data.equipment_sub_class,
        "p_mf_model_number": data.mf_model_number,
        "p_mf_color": data.mf_color,
        "p_mf_license_state": data.mf_license_state,
        "p_mf_license_number": data.mf_license_number,
        "p_mf_license_expiry": data.mf_license_expiry,
        "p_mf_fuel_type": data.mf_fuel_type,
        "p_mf_weight": data.mf_weight,
        "p_mf_warranty_code": data.mf_warranty_code,
        "p_ast_date_in_service": data.ast_date_in_service,
        "p_ast_retired_date": data.ast_retired_date,
        "p_ast_insured_by": data.ast_insured_by,
        "p_ast_insured_policy": data.ast_insured_policy,
        "p_billing_category": data.billing_category,
        "p_last_updated_by": user,
        "p_file_name": data.file_name,
        "p_file_type": data.file_type,
        "p_file_content": data.file_content,
        // "p_non_labor_resource": data.non_labor_resource,
        // "p_non_labor_resource_org": data.non_labor_resource_org,
        "p_default_location": data.default_location,
        "p_addressline1": data.address_line1,
        "p_addressline2": data.address_line2,
        "p_city": data.city,
        "p_country": data.country,
        "p_zip": data.zip,
        "p_state": data.state,
        "p_county": data.county,
        "p_latitude": data.latitude,
        "p_update_type":"EQP_UPDATE",
        "p_longitude": data.longitude,
        "p_rental_purchase_order": data.purchase_order,
        "p_file_attachment": data.file_attachment
      };
      return payload;
    }

    processFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const fileName = file.name;
          const fileType = file.type;

          resolve({
            fileName: fileName,
            fileType: fileType,
            fileContent: fileContent
          });
        };

        reader.onerror = function (error) {
          console.log('isnode error');
          reject(error);
        };
      });
    }


  }

  return PageModule;
});
