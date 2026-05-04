define([
  'vb/action/actionChain',
  'vb/action/actions'
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class quantityIncreasevalueChangeAction extends ActionChain {
    async run(context, { value, currentObj }) {
      const { $functions, $variables } = context;
      let clonedObj = JSON.parse(JSON.stringify(currentObj));
      clonedObj.equip_req_quantity = value;
const dateDifference = 
      await $functions.getDateDifference($variables.startdate, $variables.enddate, currentObj.bill_rate, '', clonedObj.equip_req_quantity);

      clonedObj.cost_rate = dateDifference;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.equipmentADP,
        update: {
          data: clonedObj,
        },
      });
    }
  }

  return quantityIncreasevalueChangeAction;
});
