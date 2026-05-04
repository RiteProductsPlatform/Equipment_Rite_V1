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

  class CustomerSelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (data) {

     

      $variables.headerObj.Customerid = data.party_id;

      // const response = await Actions.callRest(context, {
      //   endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05CollaborationCustomersLOVCustidChildSitesLOV',
      //   uriParams: {
      //     custid: data.CustomerId,
      //   },
      // });
        const response = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_RENTAL_CUSTOMER_DETAILS1_0GetCustomerDetails',
          uriParams: {
            'p_party_id': data.party_id,
          },
        });
        $variables.billtoAddressAdp.data = response.body.items;
      $variables.customerSiteAdp.data = response.body.items;
      $variables.headerObj.CustomerNumber = data.party_number;


      
    }
     }
  }

  return CustomerSelectValueItemChangeChain;
});
