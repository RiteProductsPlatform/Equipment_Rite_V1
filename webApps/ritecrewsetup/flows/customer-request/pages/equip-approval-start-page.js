define([], () => {
  'use strict';

  class PageModule {
      // date conversion function 22-04-2-26
    formatDate(dateStr) {
      const [year, month, day] = dateStr.split("-");
      return `${day}-${month}-${year}`;
    }

    // date function end
  }
  
  return PageModule;
});
