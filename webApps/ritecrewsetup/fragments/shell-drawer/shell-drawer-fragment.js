define([
  "knockout",
  "ojs/ojknockout-keyset",
  "ojs/ojarraytreedataprovider",
], function (ko, keySet, ArrayTreeDataProvider) {
  "use strict";

  class FragmentModule {
      closeDrawer() {
      document.querySelector('#navDrawer').startOpened = false;
    }
  }

  return FragmentModule;
});