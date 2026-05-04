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

  class PageVbEnterChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
     // console.log($variables.agrArray);

       const loadOpen = await Actions.callComponentMethod(context, {
            selector: '#load',
            method: 'open',
          });
        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetEquipmentNames',
          uriParams: {
            'p_end_date': "",
            'p_equipment_name': "",
            'p_equipment_resource_class': "",
            'p_start_date': "",
          },
        });
        if (response2.ok) {     
          // debugger;
          const generateStructure = await $functions.generateStructure(JSON.stringify(response2.body.items));
          const navigationContent = await $functions.getNavigationContent(generateStructure);
          $variables.navTree = navigationContent;
        }
        if ($variables.agrArray.length === 0) {
          const response3 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getGetEquipmentNames',
            uriParams: {
              'p_end_date': '',
              'p_equipment_name': '',
              'p_equipment_resource_class': "CRAWLER CRANE",
              'p_start_date': '',
              'p_equipment_sub_class': "",
            },
          });

          const response = await Actions.callRest(context, {
            endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
          });
          const uniqueEquipments = await $functions.getUniqueEquipments(response3.body.items, response.body.items);
          $variables.equipmentADP.data = uniqueEquipments;
          const loadClose = await Actions.callComponentMethod(context, {
            selector: '#load',
            method: 'close',
          });

        
      }
      else {

        if ($variables.agrArray.length !== 0) {
          $variables.equipmentADP.data = $variables.agrArray.map(item => ({
            ...item,
            equip_req_quantity: item.quantity,
            onhand_availability: item.quantity
          }));
        }

      const loadClose = await Actions.callComponentMethod(context, {
            selector: '#load',
            method: 'close',
          });

      }






    }
  }

  return PageVbEnterChain1;
});
