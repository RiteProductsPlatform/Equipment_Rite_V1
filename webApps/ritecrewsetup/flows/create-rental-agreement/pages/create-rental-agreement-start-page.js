define([], () => {
  'use strict';

  class PageModule {
    convertToReadable(dateStr) {
      if (dateStr) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateStr);
        const day = String(date.getUTCDate()).padStart(2, '0');
      }
    }

    removeDuplicates(values) {
   const seen = new Set();
   return values.filter(item => {
     if (seen.has(item.customer_number)) {
       return false;
     } else {
       seen.add(item.customer_number);
       return true;
     }
   });
 }


  removeDuplicates2(values) {
   const seen = new Set();
   return values.filter(item => {
     if (seen.has(item.agreement_type)) {
       return false;
     } else {
       seen.add(item.agreement_type);
       return true;
     }
   });
 }


 removeDuplicates3(values) {
   const seen = new Set();
   return values.filter(item => {
     if (seen.has(item.status_code)) {
       return false;
     } else {
       seen.add(item.status_code);
       return true;
     }
   });
 }




    convertToDateFormate(dateStr) {
      if (dateStr) {
        const date = new Date(dateStr);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const month = monthNames[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
      }

    }
  }
  return PageModule;
});
