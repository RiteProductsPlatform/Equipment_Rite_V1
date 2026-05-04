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

  class DivClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.current 
     * @param {string} params.location 
     */
    async run(context, { current, location }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if(  
$variables.locationDetails.p_city &&
$variables.searchObj.fromdate &&
$variables.searchObj.todate

      ){
      const toEquipmentRentalDetails = await Actions.navigateToPage(context, {
        page: 'equipment-rental-details',
        params: {
          equipmentName: current.equipment_class,
          locationdetails: $variables.locationDetails,
        },
      });
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Enter Location and Requested Dates',
          type: 'error',
          displayMode: 'transient',
        });
        
      }




    }
  }

  return DivClickAction;
});
