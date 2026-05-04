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

    
    cartAddition(current, myarray) {
      let array = JSON.parse(myarray);
      const exists = array.some(item => item.equipment_id === current.equipment_id);
      if (!exists) {
        array.push(current);
      }

      return array;
    }

      itemSelectable(context) {
      return context.leaf;
    }

     generateStructure(myitems) {
      let items = JSON.parse(myitems);
      let grouped = {};

      items.forEach(item => {
        const parentId = item.equipment_class?.trim();
        const childLabel = item.equipment_sub_class?.trim();

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

    // NOTE: Deprecated on 24/10/2025
    // The below implementation was commented out because it does not correctly handle scenarios
    // where the start date and end date are the same. In such cases, the calculation incorrectly
    // returns a duration of zero days instead of one day. A new implementation has been introduced
    // to ensure accurate billing duration and cost calculation.

    // getDateDifference(startDate, endDate, bill_rate, frequency, equip_req_quantity) {
    // frequency includes Day, Week, Month
    //   const start = new Date(startDate);
    //   const end = new Date(endDate);
    //   const differenceInTime = end - start;
    //   const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Round down

    //   const baseCost = (differenceInDays > 0 ? differenceInDays + 1 : differenceInDays) * bill_rate;
    //   return baseCost * (equip_req_quantity ? Number(equip_req_quantity) : 1);
    // }

    //new code developed on 24/10/2025
    getDateDifference(startDate, endDate, bill_rate, frequency, equip_req_quantity) {
      // debugger;
      // frequency includes Day, Week, Month (not used in this version)
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end - start;
      let differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
      if (differenceInDays >= 0) {
        differenceInDays = differenceInDays + 1;
      }
      return differenceInDays * bill_rate;
      //commented madhu remove if required
     // const baseCost = differenceInDays * bill_rate;
     // return baseCost * (equip_req_quantity ? Number(equip_req_quantity) : 1);
    }



    removefromCart(current, myarray) {
      let array = JSON.parse(myarray);
      let finalarray = [];
      for (let i = 0; i < array.length; i++) {
        if (current.equipment_id !== array[i].equipment_id) {
          finalarray.push(array[i]);
        }
      }
      return finalarray;
    }
    marginFormula(mybillrate, mycostrate) {
      // Convert billrate and costrate to numbers
      let billrate = Number(mybillrate);
      let costrate = Number(mycostrate);

      // Check for valid billrate and costrate before proceeding with the calculation
      if (isNaN(billrate) || billrate <= 0) {
        return '0%';
      }

      if (costrate === 0 || isNaN(costrate)) {
        return 'N/A';
      }

      // Calculate margin
      let margin = ((billrate - costrate) / costrate) * 100;

      // Return margin as a rounded percentage string
      return `${(Math.round(margin * 100) / 100).toFixed(2)}%`;
    }

    openDailog() {
      // mapboxgl.accessToken = '';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-73.99209, 40.68933],
        zoom: 8.8
      });
      const geocoder = new MapboxGeocoder();
      // geocoder.accessToken = '';
      geocoder.options = {
        proximity: [-73.99209, 40.68933]
      };
      geocoder.marker = true;
      geocoder.mapboxgl = mapboxgl;
      map.addControl(geocoder);
      map.on('click', (e) => {
        let coordinates = e.lngLat;
        // Call the reverse geocoding API
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`)
          .then(response => response.json())
          .then(data => {
            var placeName = data.features[0]?.place_name || "No address found";
            console.log('Address:', placeName);
            console.log(`Coordinates: ${coordinates.lat}, ${coordinates.lng}\nAddress: ${placeName}`);
          })
          .catch(err => console.error('Error with reverse geocoding:', err));
      });
    }

    processFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const fileName = file.name;
          const fileType = file.type;
          resolve({
            fileName: fileName,
            fileType: fileType,
            fileContent: fileContent
          });
        };
        reader.onerror = function (error) {
          reject(error);
        };
      });
    }
    getDistanceBtwTwoLatitute(lat1, lon1, lat2, lon2) {
      if (lat1 && lon1 && lat2 && lon2) {
        const R = 6371;
        const toRad = (deg) => deg * (Math.PI / 180);
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const radLat1 = toRad(lat1);
        const radLat2 = toRad(lat2);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radLat1) * Math.cos(radLat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }
      else {
        return -1;
      }
    }

    uniquetasks(mydata) {
      let data = JSON.parse(JSON.stringify(mydata));
      const seen = new Set();
      const unique = [];
      for (const item of data) {
        if (!seen.has(item.TaskId)) {
          seen.add(item.TaskId);
          unique.push(item);
        }
      }
      return unique;
    }


    cartPayloadgenerator(reqnumber, row, current, array, p_equipment_cart_number, startdate, endDate, user, soft_reservation, locationLov) {
      // "business_unit_id": 300001690071768,
      //         "business_unit_name": "MMX India Business Unit"
      let obj1 = {
        "soft_reservation": soft_reservation,
        "inventory_item": row.inventory_item,
        "inventory_item_id": row.inventory_item_id,
        "business_unit_id": row.bu_id,
        "business_unit_name": row.bu_name,
        "addressline1": row.addressline1 || locationLov.ADDRESS_LINE_1,
        "addressline2": row.addressline2 || locationLov.ADDRESS_LINE_2,
        "city": row.city || locationLov.TOWN_OR_CITY,
        "country": row.country || locationLov.COUNTRY,
        "crew_id": row.crew_id ? row.crew_id.toString() : "",
        "crew_name": row.crew_name,
        "efforts_per_day": row.efforts_per_day ? row.efforts_per_day.toString() : "",
        "end_date": endDate,
        "eqp_request_number": reqnumber,
        "equip_req_quantity": current.equip_req_quantity ? current.equip_req_quantity.toString() :"",
        "equipment_class": current.equipment_class,
        // "equipment_id": current.equipment_id,
        "equipment_id": null,
        "equipment_name": current.equipment_name,
        // "equipment_number": current.equipment_number,
        "equipment_number": null,
        "equipment_type": current.equipment_type,
        "latitude": row.longitude ? row.longitude.toString() : "",
        "location": row.location || locationLov.name,
        "longitude": row.latitude ? row.latitude.toString() : "",
        "non_labor_resource": current.non_labor_resource,
        "non_labor_resource_org": current.non_labor_resource_org,
        "project_id": row.project_id ? row.project_id.toString() : "",
        "project_name": row.project_name,
        "project_number": row.project_number,
        "rate_basis": row.rate_basis,
        "request_type": row.request_type,
        "requestor_name": user,
        "created_by": user,
        "start_date": startdate,
        "task_id": row.task_id ? row.task_id.toString() : "",
        "task_name": row.task_name,
        "task_number": row.task_number,
        "utilization": row.utilization ? row.utilization.toString() : "",
        "zipcode": row.zipcode || locationLov.POSTAL_CODE
      };
      return obj1;
    }

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month and pad with '0'
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }

    enrichEquipmentArray(responseArray) {
      return responseArray.map(item => ({
        ...item,
        equipment_class: item.equipment_class ?? null,
        availability: Number(item.availability) || 0,
        onhand_availability: Number(item.onhand_availability) || 0,
        file_content: item.file_content ?? null,
        startdate: item.startdate ?? null,
        enddate: item.enddate ?? null,
        bill_rate: Number(item.bill_rate) || 0,
        equip_req_quantity: item.equip_req_quantity !== undefined
          ? Number(item.equip_req_quantity)
          : 0,
        equipment_name: item.equipment_name ?? null
      }));
    }

    getUniqueEquipments(data, nonlabourdata) {

      if (!data) return [];

      let eqpName = [];
      let uniqItems = [];

      data.forEach((itm) => {
        if (eqpName.indexOf(itm.equipment_name) === -1) {
          if (itm.equip_req_quantity !== null && itm.equip_req_quantity !== undefined) {
            itm.equip_req_quantity = Number(itm.equip_req_quantity);
          } else {
            itm.equip_req_quantity = 0; // default if null/undefined
          }
          itm.totQuantity = itm.onhand_availability;

          let matchedRate = null;

          if (Array.isArray(nonlabourdata) && nonlabourdata.length > 0) {
            const matchedRateObj = nonlabourdata.find(nl =>
              nl.non_labor_resource_name === itm.non_labor_resource
            );

            if (matchedRateObj) {
              matchedRate = matchedRateObj.rate;
              itm.rate_schedule_name = matchedRateObj.rate_schedule_name; // optional
            }
          }
          // debugger;
          // Set bill_rate: matched rate or 0
          //commenting need Madhu need clarificattion
          //itm.bill_rate = matchedRate !== null ? matchedRate : 0;

          uniqItems.push(itm);
          eqpName.push(itm.equipment_name);
        }
      });

      return uniqItems;
    }

    //     getUniqueEquipments(data, nonlabourdata) {
    //   if (!data) return [];

    //   let eqpName = [];
    //   let uniqItems = [];

    //   data.forEach((itm) => {
    //     if (eqpName.indexOf(itm.equipment_name) === -1) {

    //       // If onhand_availability is null/undefined, set to 0
    //       const onHandQty = itm.onhand_availability ?? 0;
    //       itm.totQuantity = onHandQty;

    //       let matchedRate = null;

    //       if (Array.isArray(nonlabourdata) && nonlabourdata.length > 0) {
    //         const matchedRateObj = nonlabourdata.find(nl =>
    //           nl.non_labor_resource_name === itm.non_labor_resource
    //         );

    //         if (matchedRateObj) {
    //           matchedRate = matchedRateObj.rate;
    //           itm.rate_schedule_name = matchedRateObj.rate_schedule_name; // optional
    //         }
    //       }

    //       // Set bill_rate: matched rate or 0
    //       itm.bill_rate = matchedRate !== null ? matchedRate : 0;

    //       uniqItems.push(itm);
    //       eqpName.push(itm.equipment_name);
    //     }
    //   });

    //   return uniqItems;
    // }


    //  getUniqueEquipments(data, nonlabourdata) {
    //   if (!data) return [];

    //   const eqpName = [];
    //   const uniqItems = [];

    //   data.forEach((itm) => {
    //     if (eqpName.indexOf(itm.equipment_name) === -1) {

    //       // Ensure null or undefined returns 0
    //       itm.totQuantity = itm.onhand_availability ?? 0;

    //       let matchedRate = null;

    //       if (Array.isArray(nonlabourdata) && nonlabourdata.length > 0) {
    //         const matchedRateObj = nonlabourdata.find(
    //           nl => nl.non_labor_resource_name === itm.non_labor_resource
    //         );

    //         if (matchedRateObj) {
    //           matchedRate = matchedRateObj.rate;
    //           itm.rate_schedule_name = matchedRateObj.rate_schedule_name;
    //         }
    //       }

    //       // Ensure bill_rate is never null
    //       itm.bill_rate = matchedRate ?? 0;

    //       uniqItems.push(itm);
    //       eqpName.push(itm.equipment_name);
    //     }
    //   });

    //   return uniqItems;
    // }

    //  getUniqueEquipments(data, nonlabourdata) {
    //   if (!data) return [];

    //   const eqpName = [];
    //   const uniqItems = [];

    //   data.forEach((itm) => {
    //     if (!eqpName.includes(itm.equipment_name)) {

    //       // Force onhand_availability to never be null
    //       itm.onhand_availability = itm.onhand_availability ?? 0;

    //       // Use it safely
    //       itm.totQuantity = itm.onhand_availability;

    //       let matchedRate = null;

    //       if (Array.isArray(nonlabourdata) && nonlabourdata.length > 0) {
    //         const matchedRateObj = nonlabourdata.find(
    //           nl => nl.non_labor_resource_name === itm.non_labor_resource
    //         );

    //         if (matchedRateObj) {
    //           matchedRate = matchedRateObj.rate;
    //           itm.rate_schedule_name = matchedRateObj.rate_schedule_name;
    //         }
    //       }

    //       itm.bill_rate = matchedRate ?? 0;

    //       uniqItems.push(itm);
    //       eqpName.push(itm.equipment_name);
    //     }
    //   });

    //   return uniqItems;
    // }






  };




  return PageModule;
});
