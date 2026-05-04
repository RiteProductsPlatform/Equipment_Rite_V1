define([], () => {
  'use strict';

  class PageModule {
    createagrHdr(data) {
      let payload = {
        "p_agreement_id": "",
        "p_agreement_number": data.AgreementNumber || "",
        "p_agreement_name": data.AgreementNumber || "",
        "p_agreement_description": data.AgreementNumber || "",
        "p_agreement_type": data.AgreementType || "",
        "p_agreement_type_code": data.AgreementType || "",
        "p_customer_id": data.Customerid || "",
        "p_customer_number": data.Customer || "",
        "p_customer_name": data.Customer || "",
        "p_customer_site_id": data.customersiteid || "",
        "p_customer_account_id": "",
        "p_account_number": data.CustomerAccountNumber || "",
        "p_account_name": "",
        "p_customer_account_site_id": "",
        "p_owner_entity_code": "",
        "p_warehouse_code": "",
        "p_payment_terms_code": data.PaymentTerms || "",
        "p_currency_code": data.Currency || "",
        "p_bill_to_address": data.billtoAddress || "",
        "p_start_date": this.formatDate(data.StartDate) || "",
        "p_end_date": this.formatDate(data.EndDate) || "",
        "p_status_code": data.Status
      };
      return payload;
    }

    createAgrLines(data, agrid) {
      let payload = {
        "p_line_id": "",
        "p_agreement_id": agrid || "",
        "p_line_number": "",
        "p_equipment_id": data.eqp_id || "",
        "p_equipment_class": data.eqp_class || "",
        "p_equipment_number": data.eqp_number || "",
        "p_equipment_name": data.eqp_name || "",
        "p_equipment_type": "",
        "p_quantity": data.quantity || "",
        "p_rate_basis": data.rate_basis || "",
        "p_rental_type_code": data.rental_type || "",
        "p_rate_amount": data.rate_amount || "",
        "p_currency": data.currency || "",
        "p_valid_from": this.formatDate(data.valid_from) || "",
        "p_valid_to": this.formatDate(data.valid_to) || "",
        "p_status_code": "DRAFT",
        "p_comments": data.notes || "",
        "p_project_name": data.projectname || "",
        "p_project_number": data.projectnumber || "",
        "p_project_id": data.projectid || "",
        "p_project_name_number": data.prjnamenumber || "",
        "p_task_number": data.tasknumber || "",
        "p_task_name": data.taskname || "",
        "p_task_id": data.taskid
      };
      return payload;
    }

    formatDate(inputDate) {
      if (inputDate) {
        const date = new Date(inputDate);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }

    }
  }

  return PageModule;
});
