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
    
      if($application.variables.equvariables){

        let equVari = {...$application.variables.equvariables};

            $variables.equpvariables.addressline1 = equVari.addressline1;
             $variables.equpvariables.country = equVari.country;
             $variables.equpvariables.addressline2 =   equVari.addressline2;
             $variables.equpvariables.city = equVari.city;  


        if(equVari.equipment_class==='BULK ITEMS' || equVari.equipment_class==='SMALL TOOLS'){
          equVari.equip_req_quantity ="";
        }
        else{
           equVari.equip_req_quantity ="1";
        }
        
         await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentnewADP,
        add: {
          data: equVari,
        },
      });
       
      }
      else{
      $variables.equpvariables_copy.equipment_id = $variables.equipmentnewADP.data.length===0? 1 : $variables.equipmentnewADP.data.length + 1;
      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentnewADP,
        add: {
          data: $variables.equpvariables_copy,
        },
      });
      }

    }
  }

  return PageVbEnterChain;
});
