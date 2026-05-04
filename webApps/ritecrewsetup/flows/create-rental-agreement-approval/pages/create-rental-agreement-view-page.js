define([], () => {
  'use strict';

  class PageModule {
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
