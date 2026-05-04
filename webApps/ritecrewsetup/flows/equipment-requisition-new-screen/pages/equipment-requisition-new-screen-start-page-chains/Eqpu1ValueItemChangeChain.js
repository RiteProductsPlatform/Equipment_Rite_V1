define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class Eqpu1ValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, data, metadata, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
       let defautObj = { ...$application.variables.equvariables }; 
      if (data.equipment_class === "BULK ITEMS") {       
        $variables.equpvariables.project_name = defautObj.project_name;
        $variables.equpvariables.project_id = defautObj.project_id;
        $variables.equpvariables.project_number = defautObj.project_number;
        $variables.equpvariables.task_id = defautObj.task_id;
        $variables.equpvariables.task_name = defautObj.task_name;
        $variables.equpvariables.task_number = defautObj.task_number;
        $variables.equpvariables.crew_id = defautObj.crew_id;
        $variables.equpvariables.crew_name = defautObj.crew_name;
        $variables.equpvariables.start_date = defautObj.start_date;
        $variables.equpvariables.end_date = defautObj.end_date;
        $variables.equpvariables.zipcode = defautObj.zipcode;
        $variables.equpvariables.location = defautObj.location;
        $variables.equpvariables.latitude = defautObj.latitude;
        $variables.equpvariables.longitude = defautObj.longitude;
        $variables.equpvariables.city = defautObj.city;
        $variables.equpvariables.country = defautObj.country;
        $variables.equpvariables.addressline1 = defautObj.addressline1;
        $variables.equpvariables.addressline2 = defautObj.addressline2;
        $variables.equpvariables.utilization = defautObj.utilization;
        $variables.equpvariables.efforts_per_day = "";              
        $variables.equpvariables.rate_basis = defautObj.rate_basis;
        $variables.equpvariables.request_type = defautObj.request_type;
        $variables.equpvariables.requestor_name = defautObj.requestor_name;
        $variables.equpvariables.equipment_type=  $application.variables.equpdtls.equipment_type;
        $variables.equpvariables.non_labor_resource= $application.variables.equpdtls.non_labor_resource;
        $variables.equpvariables.non_labor_resource_org= $application.variables.equpdtls.non_labor_resource_org;   
      }  
      else{
         $variables.equpvariables.project_name = defautObj.project_name;
        $variables.equpvariables.project_id = defautObj.project_id;
        $variables.equpvariables.project_number = defautObj.project_number;
        $variables.equpvariables.task_id = defautObj.task_id;
        $variables.equpvariables.task_name = defautObj.task_name;
        $variables.equpvariables.task_number = defautObj.task_number;
        $variables.equpvariables.crew_id = defautObj.crew_id;
        $variables.equpvariables.crew_name = defautObj.crew_name;
        $variables.equpvariables.start_date = defautObj.start_date;
        $variables.equpvariables.end_date = defautObj.end_date;
        $variables.equpvariables.zipcode = defautObj.zipcode;
        $variables.equpvariables.location = defautObj.location;
        $variables.equpvariables.latitude = defautObj.latitude;
        $variables.equpvariables.longitude = defautObj.longitude;
        $variables.equpvariables.city = defautObj.city;
        $variables.equpvariables.country = defautObj.country;
        $variables.equpvariables.addressline1 = defautObj.addressline1;
        $variables.equpvariables.addressline2 = defautObj.addressline2;               
        $variables.equpvariables.rate_basis = defautObj.rate_basis;
        $variables.equpvariables.request_type = defautObj.request_type;
        $variables.equpvariables.requestor_name = defautObj.requestor_name;
        $variables.equpvariables.equipment_type=  $application.variables.equpdtls.equipment_type  ;
        $variables.equpvariables.non_labor_resource= $application.variables.equpdtls.non_labor_resource;
        $variables.equpvariables.non_labor_resource_org= $application.variables.equpdtls.non_labor_resource_org; 

      }  
    }
  }

  return Eqpu1ValueItemChangeChain;
});
