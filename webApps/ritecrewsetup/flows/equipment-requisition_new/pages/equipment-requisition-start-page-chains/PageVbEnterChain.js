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

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/ProjectDetailsPWA',
      });

      $variables.projectnamevariable.data = response.body.items;

       $variables.equpvariable_copy.equipment_id = $variables.equipmentnewADP.data.length===0? 1 : $variables.equipmentnewADP.data.length + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentnewADP,
        add: {
          data: $variables.equpvariable_copy,
        },
      });


    }
  }

  return PageVbEnterChain;
});
