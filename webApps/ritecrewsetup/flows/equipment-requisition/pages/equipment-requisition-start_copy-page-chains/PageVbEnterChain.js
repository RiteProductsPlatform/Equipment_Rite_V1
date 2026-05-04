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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (sessionStorage.getItem('parameters')) {     
   await Actions.callComponentMethod(context, {
            selector: '#oj-dialog--1239369820-1',
            method: 'open',
          });
        $variables.request_type ='Project';
        $variables.selectedRow.request_type ='Project';

        const params = JSON.parse(sessionStorage.getItem('parameters'));
        $variables.selectedRow.equipment_number = params.equpName;
        $variables.selectedRow.start_date = params.varStartDate;
        $variables.selectedRow.end_date = params.varEndDate;
        $variables.selectedRow.schedule_cost_rate = params.cost;
        $variables.equplatitude = params.latitude;
        $variables.equplongitude = params.longitude;
        

     

        
      }
//  debugger;
      if ($variables.navigatefrom==="Agreement") {
        $variables.isAddEquipment = 'Y';

        const results = await ActionUtils.forEach($variables.agrArray, async (item, index) => {
     
          let obj={
            "requestor_name": "",
        "request_type": "Project",
        "utilization": "",
        "city": "",
        "country": "",
        "equip_req_quantity":item.quantity,
        "equipment_class": item.equipment_class,
        "equipment_id": item.equipment_id,
        "eqp_request_number": "",
        "equipment_name": item.equipment_name,
        "equipment_number": item.equipment_number,
        "equipment_type":  "",
        "latitude": "",
        "location": "",
        "longitude": "",
        "project_id": item.project_id,
        "project_number": item.project_number,
        "schedule_cost_rate":"",
        "addressline1": "",
        "addressline2": "",
        "crew_id": "",
        "crew_name": "",
        "efforts_per_day": "",
        "start_date":item.valid_from,
        "end_date": item.valid_to,
        "zipcode": "",
        "file_attachment": "",
        "non_labor_resource": "",
        "non_labor_resource_org": "",
        "task_id": item.task_id,
        "task_number": item.task_number,
        "task_name": item.task_name,
        "project_name": item.project_name,
        "business_unit_id": "",
        "soft_reservation":"",
        "business_unit_name":"",
        "inventory_org":"",
        "inventory_org_id" :"",
        "location_id": ""
          };

          await Actions.fireDataProviderEvent(context, {
            target: $variables.payloadADP,
            add: {
              data: obj,
            },
          });
          // debugger
        }, { mode: 'serial' });
      }

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/ProjectDetailsPWA',
      });

      $variables.projectnamevariable.data = response.body.items;


    }
  }

  return PageVbEnterChain;
});
