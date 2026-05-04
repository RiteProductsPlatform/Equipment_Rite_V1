define([], () => {
  'use strict';

  class PageModule {
       calculateTotalQuoteAmount(data) {
      return data.reduce((sum, item) => {
        const amount = parseFloat(item.quote_amount) || 0;
        return sum + amount;
      }, 0);
    }
  }
  
  return PageModule;
});
