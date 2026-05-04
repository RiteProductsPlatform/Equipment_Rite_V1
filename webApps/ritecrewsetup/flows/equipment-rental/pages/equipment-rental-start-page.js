define([
  "knockout",
  "ojs/ojknockout-keyset",
  "ojs/ojarraytreedataprovider",
], function (ko, keySet, ArrayTreeDataProvider) {
  "use strict";

  class PageModule {

    constructor() {
      this.metadata = {
        navigationMenu: {},
      };
      this.navlistExpanded = new keySet.ObservableKeySet();
    }
    // formatDate(inputDate) {
    //   const [month, day, year] = inputDate.split('/').map(Number);
    //   const fullYear = year < 100 ? 2000 + year : year; // Handle 2-digit year
    //   const date = new Date(fullYear, month - 1, day);

    //   const options = { day: '2-digit', month: 'short', year: 'numeric' };
    //   return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    // }
    formatDate(inputDate) {
      const [month, day, year] = inputDate.split('/').map(Number);
      const fullYear = year < 100 ? 2000 + year : year; // Handle 2-digit year
      const paddedMonth = String(month).padStart(2, '0');
      const paddedDay = String(day).padStart(2, '0');
      return `${fullYear}-${paddedMonth}-${paddedDay}`;
    }







    getNavigationContent(metadata) {
      if (this.navigationContent === undefined) {
        this.navigationContent = ko.observable(
          new ArrayTreeDataProvider(
            this._getNavigationData(metadata.navigationMenu),
            {
              keyAttributes: "attr.id",
            }
          )
        );
      }
      return this.navigationContent;
    }

    _getNavigationData(menu) {
      let navData = [],
        self = this;

      for (let i = 0; i < menu.length; i++) {
        let menuItem = {};
        let origMenuItem = menu[i];
        if (typeof origMenuItem === "object") {
          menuItem.attr = {
            id: origMenuItem.id,
            name: origMenuItem.label,
            icon: origMenuItem.icon,
            badge: origMenuItem.badge,
            node: origMenuItem.node,
          };
        }
        if (origMenuItem.items && origMenuItem.items.length > 0)
          menuItem.children = this._getNavigationData(origMenuItem.items);
        navData.push(menuItem);
      }
      return navData;
    }

    itemSelectable(context) {
      return context.leaf;
    }
    getUniqueEquipments(mydata) {
      let data = JSON.parse(mydata);

      if (data) {
        let eqpName = [];
        let uniqItems = [];
        data.forEach((itm) => {
          if (eqpName.length === 0) {
            uniqItems.push(itm);
            eqpName.push(itm.equipment_name);

          }
          else if (eqpName.indexOf(itm.equipment_name) === -1) {
            uniqItems.push(itm);
            eqpName.push(itm.equipment_name);
          }

        });
        return uniqItems;
      }

    }
    generateStructure(myitems) {
      let items = JSON.parse(myitems);
      let grouped = {};

      items.forEach(item => {
        const parentId = item.equipment_class?.trim();
        const childLabel = item.equipment_name?.trim();

        if (!parentId || !childLabel) return;

        if (!grouped[parentId]) {
          grouped[parentId] = {
            id: parentId,
            label: parentId,
            icon: "", // can be assigned dynamically elsewhere
            node: "parent",
            items: [],
            _names: new Set()
          };
        }

        if (!grouped[parentId]._names.has(childLabel)) {
          grouped[parentId].items.push({
            id: childLabel,
            label: childLabel,
            icon: "" // leave empty or derive dynamically
          });
          grouped[parentId]._names.add(childLabel);
        }
      });

      // Cleanup _names helper
      let navdata = Object.values(grouped).map(group => {
        delete group._names;
        return group;
      });

      return { "navigationMenu": navdata };
    }

    test(data) {
      console.log(data);
    }



  }

  return PageModule;
});
