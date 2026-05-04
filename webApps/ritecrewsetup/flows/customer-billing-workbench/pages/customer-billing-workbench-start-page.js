define([], () => {
  'use strict';

  class PageModule {
     removeDuplicatesByReservationNumber(arr) {
  const seen = new Set();
  return arr.filter(item => {
    if (seen.has(item.reservation_number)) {
      return false;
    }
    seen.add(item.reservation_number);
    return true;
  });
}
removeDuplicatesBycontract(arr) {
  const seen = new Set();
  return arr.filter(item => {
    if (seen.has(item.contract_number)) {
      return false;
    }
    seen.add(item.contract_number);
    return true;
  });
}
removeDuplicatesByeqpnames(arr) {
  const seen = new Set();
  return arr.filter(item => {
    if (seen.has(item.equipment_name)) {
      return false;
    }
    seen.add(item.equipment_name);
    return true;
  });
}

  }
  
  return PageModule;
});
