define([
  'vb/action/actionChain',
   'vb/action/actionUtils',
  'vb/action/actions'
], (
  ActionChain,
  ActionUtils,
  Actions
) => {
  'use strict';

  class UpdateTemplateEquipmentActionChain extends ActionChain {

    async run(context) {
      const { $variables } = context;

      let issucess = true;

      if ($variables.checkboxupdate) {
        if ($variables.checkboxupdate.keys.all === false) {
          const adp = $variables.gettemplateadp;
          const selectedKeys = $variables.checkboxupdate.keys;
          const selectedRows = [];

          adp.data.forEach((row) => {
            selectedKeys.keys.forEach((itm) => {
              if (row.template_eqp_id === itm) {
                selectedRows.push(row);
              }
            });
          });


          

          

         const results = await ActionUtils.forEach(selectedRows, async (row, index) => {

            const payload = {
              p_template_eqp_id: row.template_eqp_id,
              p_template_id: row.template_id,
              p_equipment_id: row.equipment_id,
              p_equipment_number: row.equipment_number,
              p_equipment_name: row.equipment_name,
              p_eqp_serial_number: row.eqp_serial_number,
              p_equipment_class:row.equipment_class,
              p_equip_req_quantity: Number(row.equip_req_quantity),
              p_total_capacity_perday: Number(row.total_capacity_perday),
              p_utilization: row.utilization !== null && row.utilization !== undefined
                ? String(row.utilization)
                : null,
              p_notes: row.notes || null,
              p_last_updated_by: 'DIVYA'
            };

            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/putEQPRite_TemplateLinesDetails',
              body: payload
            });
            if (!response.ok) {
              $variables.issucess = false;
            }
          }, { mode: 'serial' });

          
        }
      }
      if (issucess) {


        await Actions.fireNotificationEvent(context, {
          summary: 'Updated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });



      }



    }
  }

  return UpdateTemplateEquipmentActionChain;
});
