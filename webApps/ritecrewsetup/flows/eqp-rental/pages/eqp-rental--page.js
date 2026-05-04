define(['ojs/ojcore', 'ojs/ojactionutils'], (oj, ActionUtils) => {
  'use strict';

  class PageModule {
      handleCardClick(item) {
      // Call your action chain and pass the clicked item as $params
      console.log('Card clicked:', item);
      ActionUtils.fireAction(
        { id: 'ojCardClick2', params: item }
      );
    }
  }
  
  return PageModule;
});
