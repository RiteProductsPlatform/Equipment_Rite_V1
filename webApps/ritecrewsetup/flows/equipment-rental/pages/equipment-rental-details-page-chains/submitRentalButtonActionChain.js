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

  class submitRentalButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let api_name = "postResCustomers";
      let page_name = "Equipment Rental";

      try {

        const validateGroup = await $application.functions.validateGroup('customerDtls');

        if (validateGroup === "valid") {

          if ($variables.enteredCustomerNumber === undefined || $variables.enteredCustomerNumber === null) {

            await Actions.fireNotificationEvent(context, {
              summary: 'Please enter the Customer Name or Number',
            });

            return;
          }

          // const response = await Actions.callRest(context, {
          //   endpoint: 'TimeRite_Ords_Service/postEQPRent_RequestDetails',
          //   body: $variables.locationdetails,
          // });

          $flow.variables.rentalReservationNumber =
            "RR-" + new Date().toISOString().replace(/[-:.TZ]/g, "");


          const callFunction = await this.createCustomerPayload(context, {
            arg1: $flow.variables.rentalReservationNumber,
            arg2: $variables.enteredCustomerNumber,
            arg3: $variables.enteredContactName,
            arg4: $variables.requestorEmail,
            arg5: $variables.enteredCustomerSite,
            arg6: '',
            arg7: $variables.enteredCity,
            arg8: $variables.enteredState,
            arg9: $variables.enteredPostal,
            arg10: $variables.enterdCustomerMobileNumber,
            arg11: $variables.locationdetails.p_location,
            arg12: $variables.locationdetails.p_addressline1,
            arg13: $variables.locationdetails.p_addressline2,
            arg14: $variables.locationdetails.p_city,
            arg15: $variables.locationdetails.p_country,
            arg16: $variables.locationdetails.p_zipcode,
            arg17: $variables.locationdetails.p_latitude,
            arg18: $variables.locationdetails.p_longitude
          });


          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postResCustomers',

            headers: {
              R_TRACE_ID: $application.variables.traceIdDisplay,
              R_USER_NAME: $application.user.username,
              R_PAGE_NAME: page_name
            },

            body: callFunction,
          });


          if (!response.ok) {

            let errMsg =
              response.body?.detail ||
              response.body?.message ||
              (typeof response.body === 'string'
                ? response.body
                : null) ||
              response.statusText ||
              'Unknown API Error';

            throw new Error(errMsg);
          }


          api_name = "postCartDetails";

          const results = await ActionUtils.forEach(
            $flow.variables.syncCartArray,

            async (item, index) => {

              const createPayload = await this.createPayload(context, {
                arg1: item.equipment_id,
                arg2: item.equipment_number,
                arg3: item.equipment_name,
                arg4: item.equipment_class,
                arg5: item.equipment_type,
                arg6: '',
                arg7: '',
                arg8: '',
                arg9: '',
                arg10: '',
                arg11: '',
                arg14: $variables.requestorEmail
              });


              const response2 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/postCartDetails',

                headers: {
                  R_TRACE_ID: $application.variables.traceIdDisplay,
                  R_USER_NAME: $application.user.username,
                  R_PAGE_NAME: page_name
                },

                body: createPayload,
              });


              if (!response2.ok) {

                let errMsg =
                  response2.body?.detail ||
                  response2.body?.message ||
                  (typeof response2.body === 'string'
                    ? response2.body
                    : null) ||
                  response2.statusText ||
                  'Unknown API Error';

                throw new Error(errMsg);
              }

            },

            { mode: 'serial' }
          );


          const termsDlgClose = await Actions.callComponentMethod(context, {
            selector: '#termsDlg',
            method: 'close',
          });


          const ojDialog20061869781Open = await Actions.callComponentMethod(context, {
            selector: '#oj-dialog--2006186978-1',
            method: 'open',
          });

        } else {

          await Actions.fireNotificationEvent(context, {
            summary: 'Please fill required fields',
            type: 'error',
            displayMode: 'transient',
          });

          return;
        }

      }

      catch (error) {

        const errorMessage =
          error?.message ||
          error?.body?.detail ||
          error?.body?.message ||
          "Unknown API Error";


        await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQUIP_ORCL_REST_API',

          headers: {
            R_TRACE_ID: $application.variables.traceIdDisplay || null,
            R_USER_NAME: $application.user.username,
            R_PAGE_NAME: page_name
          },

          body: {
            p_api_name: api_name,
            p_debug_message: errorMessage
          },
        });


        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: errorMessage,
          displayMode: 'persist',
          type: 'error',
        });

        return;
      }

    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.arg1 
     * @param {string} params.arg2 
     * @param {string} params.arg3 
     * @param {string} params.arg4 
     * @param {string} params.arg5 
     * @param {string} params.arg6 
     * @param {string} params.arg7 
     * @param {string} params.arg8 
     * @param {string} params.arg9 
     * @param {string} params.arg10 
     * @param {string} params.arg11 
     * @param {string} params.arg12 
     */
    async createPayload(context, {
      arg1, arg2, arg3, arg4, arg5,
      arg6, arg7, arg8, arg9, arg10,
      arg11, arg12, arg13, arg14,
      arg15, arg16, arg17
    }) {

      const { $page, $flow, $application, $constants, $variables } = context;

      const formattedDate = new Date().toISOString().slice(0, 10);

      let payload = {
        "p_equipment_id": arg1,
        "p_equipment_number": arg2,
        "p_equipment_name": arg3,
        "p_equipment_class": arg4,
        "p_equipment_type": arg5,
        "p_bill_rate": arg6,
        "p_project_id": arg7,
        "p_project_number": arg8,
        "p_project_name": arg9,
        "p_task_id": arg10,
        "p_task_number": arg11,
        "p_task_name": arg12,
        "p_utilization": arg13,
        "p_requestor_name": arg14,
        "p_start_date": $flow.variables.dateobj.startDate,
        "p_end_date": $flow.variables.dateobj.endDate,
        "p_rental_reservation_num": $flow.variables.rentalReservationNumber,
        "p_status": "Quote Requested",
        "p_customer_name": $variables.enteredCustomerNumber,
        "p_customer_site": $variables.enteredCustomerSite,
        "p_customer_contract": $variables.enteredContract,
        "p_insurance_policy": $variables.enteredInsurancePolicy,
        "p_insurance_issue_agent": $variables.insuranceIssuedBy,
        "p_insurance_start_date": $variables.insuranceStartDate,
        "p_insurance_end_date": $variables.insuranceEndDate,
        "p_mobile_number": $variables.enterdCustomerMobileNumber
      };

      return payload;
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.arg1 
     */
    async createCustomerPayload(context, {
      arg1, arg2, arg3, arg4, arg5, arg6,
      arg7, arg8, arg9, arg10, arg11,
      arg12, arg13, arg14, arg15, arg16,
      arg17, arg18
    }) {

      const { $page, $flow, $application, $constants, $variables } = context;

      let payload = {
        "p_res_number": arg1,
        "p_org_name": arg2,
        "p_contact_name": arg3,
        "p_contact_email": arg4,
        "p_s_address_line_1": arg5,
        "p_s_address_line_2": arg6,
        "p_s_city": arg7,
        "p_s_state": arg8,
        "p_mobile_number": arg10,
        "p_s_postal_code": arg9,
        "p_req_location": arg11,
        "p_req_addressline1": arg12,
        "p_req_addressline2": arg13,
        "p_req_city": arg14,
        "p_req_country": arg15,
        "p_req_zipcode": arg16,
        "p_req_latitude": arg17,
        "p_req_longitude": arg18
      };

      return payload;
    }

  }

  return submitRentalButtonActionChain;
});