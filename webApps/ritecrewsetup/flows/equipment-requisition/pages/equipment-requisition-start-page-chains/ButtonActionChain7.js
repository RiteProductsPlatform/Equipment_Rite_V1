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

  class ButtonActionChain7 extends ActionChain {
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      if ($variables.payloadADP.data.length < 1) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Add Equipments',
        });
        return;
      }
      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response2 = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
      });
      const resourceRates = response2.body.items || [];
      
      $variables.isSubmittable = false;

      const results = await ActionUtils.forEach($variables.payloadADP.data, async (item, index) => {

        const match = resourceRates.find(rate => rate.non_labor_resource_name === item.non_labor_resource);

        if (match) {
         
          item.bill_rate = await $functions.getDateDifference(item.start_date, item.end_date, match.rate, 'days');

          // if (match.rate_unit==="DY") {
          //   item.efforts_per_day = 1;
            
          // }
          
        } 
        else {
          item.bill_rate = 0;
        }
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestCartSubmit',
          body: item,
        });

        $variables.response = !!response.ok;

      }, { mode: 'serial' });

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

      await Actions.fireNotificationEvent(context, {
        type: 'confirmation',
        summary: $variables.reqNumber + " Submitted Successfully",
      });

      $variables.isSubmittable = true;

      if ($variables.response) {

        let obj = {
          "Message": "FYI - New request  " + $variables.reqNumber + "-" + "created in Equip Rite",
          "TaskCreator": $application.variables.user,
          "Role_Name": "OII Equipment Administrator"
        };
        const response3 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',
          body: obj,
        });
        await Actions.navigateToFlow(context, {
          flow: 'equipment-reservations',
          target: 'parent',
          page: 'equipment-reservations-start',
        });
      }

    }
  }

  return ButtonActionChain7;
});
