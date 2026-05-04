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
    removeDuplicates(values, key) {
  const seen = new Set();

  return values.filter(item => {
    const val = item[key];

    if (val === null || val === undefined) return false;

    if (seen.has(val)) {
      return false;
    } else {
      seen.add(val);
      return true;
    }
  });
}
  }
  return PageModule;
});
